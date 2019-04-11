import { ActionType } from 'typesafe-actions'
import { takeEvery, fork, put } from 'redux-saga/effects'
import { createSelector } from 'reselect'

import { pickBy, get as _get } from 'lodash'

import { RootState, AnyAction, ActionDescriptor, api, routing, grpc, forms, organizations, ui } from '../redux'

import { presslabs } from '@presslabs/dashboard-proto'

import { Intent } from '@blueprintjs/core'

const {
    Project,
    ProjectsService,
    ListProjectsRequest,
    ListProjectsResponse,
    GetProjectRequest,
    CreateProjectRequest,
    UpdateProjectRequest,
    DeleteProjectRequest
} = presslabs.dashboard.projects.v1

export {
    Project,
    ProjectsService,
    ListProjectsRequest,
    ListProjectsResponse,
    GetProjectRequest,
    CreateProjectRequest,
    UpdateProjectRequest,
    DeleteProjectRequest
}


//
//  TYPES

export type ProjectName = string
export interface IProject extends presslabs.dashboard.projects.v1.IProject {
    name: ProjectName
}

export type Project =
    presslabs.dashboard.projects.v1.Project

export type IProjectPayload =
    presslabs.dashboard.projects.v1.IProject

export type ListProjectsResponse =
    presslabs.dashboard.projects.v1.ListProjectsRequest

export type IListProjectsRequest =
    presslabs.dashboard.projects.v1.IListProjectsRequest

export type IGetProjectRequest =
    presslabs.dashboard.projects.v1.IGetProjectRequest

export type ICreateProjectRequest =
    presslabs.dashboard.projects.v1.ICreateProjectRequest

export type IUpdateProjectRequest =
    presslabs.dashboard.projects.v1.IUpdateProjectRequest

export type IDeleteProjectRequest =
    presslabs.dashboard.projects.v1.IDeleteProjectRequest

export type IListProjectsResponse =
    presslabs.dashboard.projects.v1.IListProjectsResponse

export type State = api.State<IProject>
export type Actions = ActionType<typeof actions>

const service = ProjectsService.create(
    grpc.createTransport('presslabs.dashboard.projects.v1.ProjectsService')
)

export const { parseName, buildName } = api.createNameHelpers('project/:slug')


//
//  ACTIONS

export const get = (payload: IGetProjectRequest) => grpc.invoke({
    service,
    method : 'getProject',
    data   : GetProjectRequest.create(payload)
})

export const list = (payload?: IListProjectsRequest) => grpc.invoke({
    service,
    method : 'listProjects',
    data   : ListProjectsRequest.create(payload)
})

export const create = (payload: ICreateProjectRequest) => grpc.invoke({
    service,
    method : 'createProject',
    data   : CreateProjectRequest.create(payload)
})

export const update = (payload: IUpdateProjectRequest) => grpc.invoke({
    service,
    method : 'updateProject',
    data   : UpdateProjectRequest.create(payload)
})

export const destroy = (payload: IProjectPayload) => grpc.invoke({
    service,
    method : 'deleteProject',
    data   : DeleteProjectRequest.create(payload)
})

const actions = {
    get,
    list,
    create,
    update,
    destroy
}

const apiTypes = api.createActionTypes(api.Resource.project)

export const {
    LIST_REQUESTED,    LIST_SUCCEEDED,    LIST_FAILED,
    GET_REQUESTED,     GET_SUCCEEDED,     GET_FAILED,
    CREATE_REQUESTED,  CREATE_SUCCEEDED,  CREATE_FAILED,
    UPDATE_REQUESTED,  UPDATE_SUCCEEDED,  UPDATE_FAILED,
    DESTROY_REQUESTED, DESTROY_SUCCEEDED, DESTROY_FAILED
} = apiTypes


//
//  REDUCER

const apiReducer = api.createReducer(api.Resource.project, apiTypes)

export function reducer(state: State = api.initialState, action: AnyAction) {
    switch (action.type) {
        case organizations.DESTROY_SUCCEEDED: {
            return api.initialState
        }

        default:
            return apiReducer(state, action)
    }

}


//
//  SAGA

export function* saga() {
    yield fork(api.emitResourceActions, api.Resource.project, apiTypes)
    yield fork(forms.takeEverySubmission, forms.Name.project, handleFormSubmission)
    yield takeEvery([
        DESTROY_SUCCEEDED,
        DESTROY_FAILED
    ], handleDeletion)
}

const handleFormSubmission = api.createFormHandler(
    forms.Name.project,
    api.Resource.project,
    apiTypes,
    actions
)

function* handleDeletion({ type, payload }: { type: ActionDescriptor, payload: grpc.Response }): Iterable<any> {
    switch (type) {
        case DESTROY_SUCCEEDED: {
            yield put(routing.push(routing.routeFor('dashboard')))
            yield put(ui.showToast({
                message : 'Project deleted',
                intent  : Intent.SUCCESS,
                icon    : 'tick-circle'
            }))
            break
        }

        case DESTROY_FAILED: {
            yield put(ui.showToast({
                message : 'Project delete failed',
                intent  : Intent.DANGER,
                icon    : 'error'
            }))
            break
        }
    }
}

//
//  SELECTORS

const selectors = api.createSelectors(api.Resource.project)

export const getState:  (state: RootState) => State = selectors.getState
export const getAll:    (state: RootState) => api.ResourcesList<IProject> = selectors.getAll
export const countAll:  (state: RootState) => number = selectors.countAll
export const getByName: (name: ProjectName) => (state: RootState) => IProject | null = selectors.getByName
export const getForURL: (url: routing.Path) => (state: RootState) => IProject | null = selectors.getForURL

export const getForOrganization = (organization: organizations.OrganizationName) => createSelector(
    getAll,
    (projects) => pickBy(projects, { organization })
)
export const getForCurrentURL = createSelector(
    [routing.getCurrentRoute, (state: RootState) => state],
    (currentRoute, state) => getForURL(currentRoute.url)(state)
)
export const getForCurrentOrganization = createSelector(
    [organizations.getCurrent, (state: RootState) => state],
    (currentOranization, state) => currentOranization
        ? getForOrganization(currentOranization.name)(state)
        : {}
)

import * as React from 'react'
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router-dom'

import { isEqual } from 'lodash'

import Container from '../components/Container'
import ProjectTitle from '../components/ProjectTitle'
import SiteTitle from '../components/SiteTitle'
import SiteForm from '../components/SiteForm'
import SiteDetails from '../components/SiteDetails'

import { RootState, DispatchProp, routing, sites, projects, organizations } from '../redux'

type ReduxProps = {
    site: sites.ISite | null,
    project: projects.IProject | null,
    currentOrganization: organizations.IOrganization | null,
    currentRoute: routing.Route
}

type Props = ReduxProps & DispatchProp

const SitesContainer: React.SFC<Props> = (props) => {
    const { site, project } = props

    if (!project) {
        return null
    }

    return (
        <Container>
            <ProjectTitle entry={ project } />
            <Switch>
                <Route
                    path={ routing.routeFor('sites', {
                        project: projects.parseName(project.name).slug,
                        slug: '_',
                        action: 'new'
                    }) }
                    render={ () => <SiteForm initialValues={ { parent: project.name } } /> }
                />
                { site && (
                    <Route
                        path={ routing.routeForResource(site, { action: 'edit' }) }
                        render={ () => <SiteForm initialValues={ { site } } /> }
                    />
                ) }
                { site && (
                    <Route
                        path={ routing.routeForResource(site) }
                        render={ () => <SiteDetails entry={ site } /> }
                    />
                ) }
            </Switch>
        </Container>
    )
}

function mapStateToProps(state: RootState): ReduxProps {
    return {
        currentRoute: routing.getCurrentRoute(state),
        currentOrganization: organizations.getCurrent(state),
        project: projects.getForCurrentURL(state),
        site: sites.getForCurrentURL(state)
    }
}

export default connect(mapStateToProps)(SitesContainer)

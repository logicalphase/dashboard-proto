import * as React from 'react'
import { connect } from 'react-redux'
import { Button, ButtonGroup, Card, Elevation, Intent } from '@blueprintjs/core'

import { get } from 'lodash'

import { RootState, DispatchProp, api, routing, projects } from '../redux'

import TitleBar from '../components/TitleBar'
import SitesList from '../components/SitesList'
import ResourceActions from '../components/ResourceActions'

type OwnProps = {
    entry?: projects.IProject | null
}

type Props = OwnProps & DispatchProp

const ProjectTitle: React.SFC<Props> = ({ entry, dispatch }) => {
    const [title, subtitle] = !entry || api.isNewEntry(entry)
        ? ['Create Project', null]
        : [entry.displayName, entry.name]

    const onDestroy = entry ? () => dispatch(projects.destroy(entry)) : undefined

    return (
        <TitleBar
            title={ title }
            subtitle={ subtitle }
            actions={
                <ResourceActions
                    entry={ entry }
                    resourceName={ api.Resource.project }
                    onDestroy={ onDestroy }
                />
            }
        />
    )
}

export default connect()(ProjectTitle)


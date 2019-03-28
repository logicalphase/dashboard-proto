import * as React from 'react'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'

import { Navbar as BlueprintNavBar, Spinner, Alignment } from '@blueprintjs/core'

import { get } from 'lodash'

import { RootState, auth, grpc, routing, organizations } from '../redux'

import Link from '../components/Link'
import UserCard from '../components/UserCard'
import OrganizationsList from '../components/OrganizationsList'

import styles from './NavBar.module.scss'

type Props = {
    dispatch: Dispatch
}

type ReduxProps = {
    currentUser         : auth.User,
    currentOrganization : organizations.IOrganization | null,
    isLoading           : boolean
}

const { Group, Heading } = BlueprintNavBar

const NavBar: React.SFC<Props & ReduxProps> = (props) => {
    const { currentUser, currentOrganization, isLoading, dispatch } = props
    return (
        <BlueprintNavBar>
            <Group align={ Alignment.LEFT }>
                <Heading className={ styles.logo }>
                    <Link to={ routing.routeFor('dashboard', {
                        org: get(currentOrganization, 'name', null)
                    }) }>
                        Presslabs Dashboard
                    </Link>
                    { isLoading && (
                        <Spinner
                            size={ Spinner.SIZE_SMALL }
                            className={ styles.spinner }
                        />
                    ) }
                </Heading>
                <OrganizationsList />
            </Group>
            <Group align={ Alignment.RIGHT }>
                <UserCard entry={ currentUser } />
            </Group>
        </BlueprintNavBar>
    )
}

const mapStateToProps = (state: RootState): ReduxProps => {
    return {
        currentUser         : auth.getCurrentUser(state),
        currentOrganization : organizations.getCurrent(state),
        isLoading           : grpc.isLoading(state)
    }
}

export default connect(mapStateToProps)(NavBar)

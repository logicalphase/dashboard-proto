import * as React from 'react'
import { connect } from 'react-redux'

import { map, get, size, isEqual, isString, isFunction } from 'lodash'

import { Card, Elevation, Intent } from '@blueprintjs/core'

import { RootState, AnyAction, Selector, DispatchProp, api, routing } from '../redux'

import Link from '../components/Link'
import TitleBar, { Props as TitleBarProps } from '../components/TitleBar'

import styles from './List.module.scss'

type OwnProps = {
    dataSelector : Selector,
    dataRequest  : AnyAction,
    title        : React.ReactNode,
    renderItem   : (entry: api.AnyResourceInstance) => React.ReactNode
}

type ReduxProps = {
    data: api.ResourcesList<api.AnyResourceInstance>
}

type Props = OwnProps & ReduxProps & DispatchProp

class List extends React.Component<Props> {
    componentDidMount() {
        const { dataRequest, dispatch } = this.props
        dispatch(dataRequest)
    }

    componentWillReceiveProps(nextProps: Props) {
        if (!isEqual(nextProps.dataRequest, this.props.dataRequest)) {
            const { dataRequest, dispatch } = nextProps
            dispatch(dataRequest)
        }
    }

    render() {
        const { data, title, renderItem, dispatch } = this.props

        const dataCount = size(data)
        const countLabel = dataCount > 0 ? dataCount : undefined

        return (
            <div>
                { isString(title) && <TitleBar title={ title } tag={ countLabel } /> }
                { React.isValidElement(title) && React.cloneElement(title, {
                    ...title.props, tag: countLabel } as TitleBarProps
                ) }
                <div className={ styles.container }>
                    { map(data, renderItem) }
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state: RootState, ownProps: OwnProps): ReduxProps => {
    const { dataSelector } = ownProps
    const data = dataSelector(state)
    return {
        data
    }
}

export default connect(mapStateToProps)(List)

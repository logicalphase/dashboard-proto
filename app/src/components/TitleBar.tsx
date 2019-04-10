import * as React from 'react'

import { isString, isNumber, isFunction } from 'lodash'

import { Card, Elevation, Button, Intent, Tag, Classes } from '@blueprintjs/core'

import styles from './TitleBar.module.scss'

export type Props = {
    title?: string | null,
    subtitle?: string | null,
    actions?: React.ReactNode,
    tag?: React.ReactNode
}

const TitleBar: React.SFC<Props> = (props) => {
    const { title, subtitle, tag, actions } = props

    return (
        <div className={ styles.container }>
            <div className={ styles.title }>
                <h2>
                    { title }
                    { (isString(tag) || isNumber(tag)) && <Tag minimal round>{ tag }</Tag> }
                    { React.isValidElement(tag) && tag }
                </h2>
                { subtitle && <h4 className={ Classes.TEXT_MUTED }>{ subtitle }</h4> }
            </div>
            <div className={ styles.actions }>
                { actions }
            </div>
        </div>
    )
}

export default TitleBar

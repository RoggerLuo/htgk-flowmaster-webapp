import React, { createClass } from 'react'
import defaultContainer from './defaultContainer'
import dbRoleContainer from './dbRoleContainer'
import ExternalCallback from './ExternalCallback'
export default function({ edit, del, add, clear }) {
    return {
        ExternalCallback: ExternalCallback({ add, clear }),
        DbRoleContainer: dbRoleContainer({ edit, add, clear }),
        DefaultContainer: defaultContainer(del)
    }
}
import React, { useContext } from 'react'
import { ActivityIndicator, View } from 'react-native'
import { AuthContext } from '../contexts/AuthContext'

import AppRoutes from './app.routes'
import AuthRoutes from './auth.routes'

function Routes() {
    const { isAuthenticated, loading } = useContext(AuthContext)

    if(loading)
        return (
            <View 
                style={{
                    flex: 1, 
                    backgroundColor: '#1D1D2E', 
                    justifyContent: 'center', 
                    alignItems: 'center' 
                }}
            >

                <ActivityIndicator size={ 60 } color='#F5f7fb' />
            </View>
        )

    return (
        isAuthenticated ? 
            <AppRoutes /> :
            <AuthRoutes />
    )
}

export default Routes
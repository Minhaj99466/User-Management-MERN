import {persistReducer} from 'redux-persist'

import userSlice from './userSlice'
import storage from 'redux-persist/lib/storage'
import { persistStore } from 'redux-persist'
import { configureStore } from '@reduxjs/toolkit'


const persistConfig={
    key:'root',
    storage
}

const persistedUserReducer=persistReducer(persistConfig,userSlice)


const Store= configureStore({
    reducer:{
        user:persistedUserReducer,
    }
})

const Persistor=persistStore(Store)

export  {Store,Persistor}
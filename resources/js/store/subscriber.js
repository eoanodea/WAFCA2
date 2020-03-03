/*
 * --------------------
 * Author Name: Eoan O'Dea
 * Author Email: eoan@wspace.ie
 * Date Created: Wednesday January 15th 2020 12:36:07 pm
 * --------------------
 * Project Name: IADTY3PPClientMangementSystem
 * Version: 1.0.0
 * --------------------
 * File Name: subscriber.js
 * Last Modified: Wednesday January 15th 2020 12:57:55 pm
 * --------------------
 * Copyright (c) 2020 WebSpace
 * --------------------
 */


import store from './index'
import axios from 'axios'

store.subscribe((mutation) => {
    console.log('runnning switch subscribe!!', mutation)
    switch(mutation.type) {
        case 'auth/SET_TOKEN':
            if(mutation.payload) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${mutation.payload}`
                localStorage.setItem('access_token', mutation.payload)
            } else {
                axios.defaults.headers.common['Authorization'] = null
                localStorage.removeItem('access_token')
            }
            break;

    }
})
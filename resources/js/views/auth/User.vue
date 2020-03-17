<template>
    <md-empty-state
        md-rounded
        md-icon="account_circle"
        :md-label="user.name"
        :md-description="user.email"
    />
</template>

<script>
    import { mapGetters } from 'vuex'
    
    export default {
        name: 'User',   
        computed: {
            ...mapGetters({
                user: 'auth/user'
            })
        }   
    }
</script>
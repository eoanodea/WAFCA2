<template>
    <md-empty-state
        md-rounded
        md-icon="account_circle"
        :md-label="user.name"
        :md-description="user.email"
    >
    <md-button class="md-raised md-primary" @click="signOut">Sign out</md-button>

    </md-empty-state>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'
    
    export default {
        name: 'User',   
        computed: {
            ...mapGetters({
                user: 'auth/user'
            })
        },
        methods: {
            ...mapActions({
                signOutAction: 'auth/signOut'
            }),   
            signOut() {
                this.signOutAction().then(() => {

                    this.$router.replace({
                        name: 'home'
                    })
                })
            },
        },
    }
</script>
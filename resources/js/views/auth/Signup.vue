<template>
    <form novalidate class="signin md-layout" @submit.prevent="validateUser">
        <md-card class="md-layout-item md-size-50 md-small-size-100">
        <md-card-header>
          <div class="md-title">Login</div>
        </md-card-header>
        <md-card-content>
        <div class="md-layout md-gutter">
            <md-field :class="getValidationClass('name')">
                <label for="name">Name</label>
                <md-input type="name" name="name" id="name" autocomplete="name" v-model="form.name" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.name.required">The name is required</span>
                <span class="md-error" v-else-if="!$v.form.name.name">Invalid name</span>
            </md-field>
            <md-field :class="getValidationClass('email')">
                <label for="email">Email</label>
                <md-input type="email" name="email" id="email" autocomplete="email" v-model="form.email" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.email.required">The email is required</span>
                <span class="md-error" v-else-if="!$v.form.email.email">Invalid email</span>
            </md-field>
            <md-field :class="getValidationClass('password')">
                <label for="password">Password</label>
                <md-input type="password" name="password" id="password" autocomplete="password" v-model="form.password" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.password.required">The password is required</span>
                <span class="md-error" v-else-if="!$v.form.password.password">Invalid password</span>
            </md-field>
        </div>
        </md-card-content>

        <md-progress-bar md-mode="indeterminate" v-if="sending" />

        <md-card-actions>
          <md-button type="submit" class="md-primary md-raised" :disabled="sending">Login</md-button>
        </md-card-actions>

        </md-card>
        <md-snackbar :md-active.sync="success">Signed in!</md-snackbar>
        <md-snackbar :md-active.sync="hasError">{{error}}</md-snackbar>
    </form>
    
</template>
<script>
    import Vue from 'vue'
    //VueX
    import { mapActions } from 'vuex'
    //Validation with vuelidate
    import { validationMixin } from 'vuelidate'
    import {
        required,
        email,
        minLength,
    } from 'vuelidate/lib/validators'
    //Vue Material
    import {
        MdField,
        MdCard,
        MdProgress,
        MdSnackbar,
        MdButton
    } from 'vue-material/dist/components'

    Vue.use(MdField)
    Vue.use(MdCard)
    Vue.use(MdProgress)
    Vue.use(MdSnackbar)
    Vue.use(MdButton)

    export default {
        name: 'Signin',
        mixins: [validationMixin],
        validations: {
            form: {
                name: {
                    required,
                    minLength: minLength(3)
                },
                email: {
                    required,
                    email
                },
                password: {
                    required,
                    minLength: minLength(6)
                }
            }
        },
        data: () => ({
            form: {
                name: null,
                email: null,
                password: null,
            },
            sending: false,
            success: false,
            hasError: false,
            error: null
        }),
        methods: {
            getValidationClass (fieldName) {
                const field = this.$v.form[fieldName]

                if (field) {
                    return {
                        'md-invalid': field.$invalid && field.$dirty
                    }
                }
            },
            validateUser () {
                this.$v.$touch()

                if (!this.$v.$invalid) {
                    this.saveUser()
                }
            },
            saveUser() {
                let app = this
                app.sending = true
                app.signUp(this.form)
                .then(() => {
                    app.sending = false
                    app.success = true
                    this.$router.replace({
                        name: 'signin'
                    })
                })
                .catch(function(error) {
                        console.log("error!", error)
                        app.hasError = true
                        app.error = error
                        app.sending = false
                })
            },
            ...mapActions({
                signUp: 'auth/signUp'
            })
        },
    }
</script>

<style lang="scss" scoped>
    .signin {
        max-width: 80%;
        margin: 50px auto; 
    }
    .md-progress-bar {
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
    }
</style>
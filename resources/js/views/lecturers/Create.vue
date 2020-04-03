<template>
    <form novalidate class="signin md-layout" @submit.prevent="validateLecturer">
        <md-card class="md-layout-item md-size-50 md-small-size-100">
        <md-card-header>
          <div class="md-name">Add Lecturer</div>
        </md-card-header>
        <md-card-content>
        <div class="md-layout md-gutter">
            <md-field :class="getValidationClass('name')">
                <label for="name">Name</label>
                <md-input type="text" name="name" id="name" autocomplete="name" v-model="form.name" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.name.required">The name is required</span>
                <span class="md-error" v-else-if="!$v.form.name.maxLength">Name cannot be over {{$v.form.name.$params.maxLength.max}} characters</span>
            </md-field>
            <md-field :class="getValidationClass('email')">
                <label for="email">Email</label>
                <md-input type="email" name="email" id="email" autocomplete="email" v-model="form.email" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.email.required">Email is required</span>
                <span class="md-error" v-else-if="!$v.form.email.email">Invalid email</span>
                <span class="md-error" v-else-if="!$v.form.email.maxLength">Email cannot be over {{$v.form.email.$params.maxLength.max}} characters</span>
            </md-field>
            <md-field :class="getValidationClass('phone')">
                <label for="phone">Phone</label>
                <md-input type="text" name="phone" id="phone" autocomplete="phone" v-model="form.phone" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.phone.required">The phone is required</span>
                <span class="md-error" v-else-if="!$v.form.address.maxLength">Phone cannot be over {{$v.form.phone.$params.maxLength.max}} characters</span>
            </md-field>
            <md-field :class="getValidationClass('address')">
                <label for="address">Address</label>
                <md-textarea name="address" id="address" autocomplete="address" v-model="form.address" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.address.required">Address is required</span>
                <span class="md-error" v-else-if="!$v.form.address.maxLength">Address cannot be over {{$v.form.address.$params.maxLength.max}} characters</span>
            </md-field>
        </div>
        </md-card-content>

        <md-progress-bar md-mode="indeterminate" v-if="sending" />

        <md-card-actions>
            <md-button type="submit" class="md-raised md-primary" :disabled="sending">Save</md-button>
        </md-card-actions>

        </md-card>
        <md-snackbar :md-active.sync="success">Lecturer created Successfully!</md-snackbar>
        <md-snackbar :md-active.sync="hasError">{{formError}}</md-snackbar>
    </form>
    
</template>
<script>
    import Vue from 'vue'
    //VueX
    import { mapActions, mapGetters } from 'vuex'
    //Validation with vuelidate
    import { validationMixin } from 'vuelidate'
    import {
        required,
        maxLength,
        email
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
        name: 'lecturerAdd',
        mixins: [validationMixin],
        validations: {
            form: {
                name: {
                    required,
                    maxLength: maxLength(50)
                },
                address: {
                    required,
                    maxLength: maxLength(100)
                },
                phone: {
                    required,
                    maxLength: maxLength(20)
                },
                email: {
                    required,
                    email,
                    maxLength: maxLength(50)
                }
            }
        },
        data: () => ({
            form: {
                name: "",
                address: "",
                phone: "",
                email: "",
            },
            sending: false,
            success: false,
            hasError: false,
            formError: null
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
            validateLecturer () {
                this.$v.$touch()

                if (!this.$v.$invalid) {
                    this.saveLecturer()
                }
            },
            saveLecturer() {
                let app = this
                app.sending = true
                app.addLecturer(this.form)
                .then((id) => {
                    app.sending = false
                    app.success = true
                    this.$router.replace({
                        path: `/lecturer/show/${id}`
                    })
                })
                .catch(function(error) {
                        console.log("error!", error)
                        app.hasError = true
                        app.formError = error
                        app.sending = false
                })
            },
            ...mapActions({
                addLecturer: 'lecturer/addLecturer'
            })
        }
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
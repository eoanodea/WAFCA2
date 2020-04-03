<template>
    <form novalidate class="signin md-layout" @submit.prevent="validateLecturer">
        <md-card class="md-layout-item md-size-50 md-small-size-100">
        <md-card-header>
          <div class="md-title">Add Lecturer</div>
        </md-card-header>
        <md-card-content>
        <div class="md-layout md-gutter">
            <md-field :class="getValidationClass('title')">
                <label for="title">Title</label>
                <md-input type="text" name="title" id="title" autocomplete="title" v-model="form.title" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.title.required">The title is required</span>
                <span class="md-error" v-else-if="!$v.form.title.maxLength">Title cannot be over {{$v.form.title.$params.maxLength.max}} characters</span>
            </md-field>
            <md-field :class="getValidationClass('description')">
                <label for="description">Description</label>
                <md-textarea name="description" id="description" autocomplete="description" v-model="form.description" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.description.required">The description is required</span>
            </md-field>
            <md-field :class="getValidationClass('code')">
                <label for="code">Code</label>
                <md-input type="text" name="code" id="code" autocomplete="code" v-model="form.code" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.code.required">Code is required</span>
                <span class="md-error" v-else-if="!$v.form.code.maxLength">Code cannot be over {{$v.form.code.$params.maxLength.max}} characters</span>
            </md-field>
            <md-field :class="getValidationClass('points')">
                <label for="points">Points</label>
                <md-input type="number" name="points" id="points" autocomplete="points" v-model="form.points" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.points.required">Points are required</span>
                <span class="md-error" v-else-if="!$v.form.points.maxLength">Points must be between {{$v.form.points.$params.between.min}} and {{$v.form.points.$params.between.max}}</span>
            </md-field>
            <md-field :class="getValidationClass('level')">
                <label for="level">Level</label>
                <md-input type="number" name="level" id="level" autocomplete="level" v-model="form.level" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.level.required">Level are required</span>
                <span class="md-error" v-else-if="!$v.form.level.maxLength">Level must be between {{$v.form.level.$params.between.min}} and {{$v.form.level.$params.between.max}}</span>
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
        minLength,
        between
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
                title: {
                    required,
                    maxLength: maxLength(50)
                },
                code: {
                    required,
                    maxLength: maxLength(5)
                },
                description: {
                    required
                },
                points: {
                    required,
                    between: between(100, 600)
                },
                level: {
                    required,
                    between: between(7, 10)
                }
            }
        },
        data: () => ({
            form: {
                title: "",
                code: "",
                description: "",
                points: 0,
                level: 0
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
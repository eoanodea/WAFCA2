<template>
    <form novalidate class="signin md-layout" @submit.prevent="validateEnrolment">
        <md-card class="md-layout-item md-size-50 md-small-size-100">
        <md-card-header>
          <div class="md-name">Add Enrolment</div>
        </md-card-header>
        <md-card-content>
        <div class="md-layout md-gutter">
            <md-datepicker 
                color="md-accent"
                v-model="form.date" 
                :md-disabled-dates="disabledDates"
                md-immediately
                :class="getValidationClass('date')"
            >
                <label>Date</label>
                <span class="md-error" v-if="!$v.form.date.minValue">Date must be greater than today</span>
            </md-datepicker>
            <md-field :class="getValidationClass('time')">
                <label for="time">Time</label>
                <md-input type="time" name="time" id="time" autocomplete="time" v-model="form.time" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.time.withParams">Time cannot be later than 19:00</span>
            </md-field>
            <md-autocomplete v-model="form.status" :md-options="statusOptions" :md-open-on-focus="false" :class="getValidationClass('status')">
                <label>Status</label>
                <template slot="md-autocomplete-item" slot-scope="{ item, term }">
                    <md-highlight-text :md-term="term" style="text-transform: capitalize">{{ item.replace('_', ' ') }}</md-highlight-text>
                </template>
                <span class="md-error" v-if="$v.form.status.minLength">Status must be at least {{$v.form.status.$params.minLength.min}} characters</span>
            </md-autocomplete>
            <course-autocomplete v-on:item-selected="onSelect" />
            <lecturer-autocomplete v-on:item-selected="onSelect" />
        </div>
        </md-card-content>

        <md-progress-bar md-mode="indeterminate" v-if="sending" />

        <md-card-actions>
            <md-button type="submit" class="md-raised md-primary" :disabled="sending">Save</md-button>
        </md-card-actions>

        </md-card>
        <md-snackbar :md-active.sync="success">Enrolment created Successfully!</md-snackbar>
        <md-snackbar :md-active.sync="hasError">{{formError}}</md-snackbar>
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
        maxLength,
        minLength,
        minValue,
        withParams
    } from 'vuelidate/lib/validators'
    //Vue Material
    import {
        MdField,
        MdCard,
        MdProgress,
        MdSnackbar,
        MdButton,
        MdDatepicker,
        MdAutocomplete,
        MdMenu
    } from 'vue-material/dist/components'
    //Date formatting
    import format from 'date-fns/format'

    import CourseAutocomplete from './autocomplete/CourseAutocomplete'
    import LecturerAutocomplete from './autocomplete/LecturerAutocomplete'

    Vue.use(MdField)
    Vue.use(MdCard)
    Vue.use(MdProgress)
    Vue.use(MdSnackbar)
    Vue.use(MdButton)
    Vue.use(MdDatepicker)
    Vue.use(MdAutocomplete)
    Vue.use(MdMenu)
    Vue.use(MdAutocomplete)

    const today = new Date()
    let dateFormat = 'yyyy-MM-dd'

    export default {
        name: 'enrolmentAdd',
        mixins: [validationMixin],
        validations: {
            form: {
                status: {
                    required,
                    minLength: minLength(4),
                    maxLength: maxLength(50)
                },
                date: {
                    required,
                    minValue: value => {
                        const now = format(today, dateFormat)
                        if(value >= now) return true
                        
                        return false
                    }
                },
                time: {
                    required,
                    withParams: value => {
                        return /^([0-1][0-9]):([0-5][0-9])$/.test(value)
                    }
                }
            }
        },
        data: () => ({
            form: {
                date: format(today, dateFormat),
                time: "00:00",
                status: "",
                course_id: 0,
                lecturer_id: null
            },
            /**
             * Disables weekends in date picker
             */
            disabledDates: date => {
                const day = date.getDay()
        
                return day === 6 || day === 0
            },
            statusOptions: [
                'interested',
                'assigned',
                'associate',
                'career_break'
            ],
            sending: false,
            success: false,
            hasError: false,
            formError: null
        }),
        methods: {
            onSelect(id, type) {
                this.form[type] = id
            },
            getValidationClass (fieldName) {
                const field = this.$v.form[fieldName]

                if (field) {
                    return {
                        'md-invalid': field.$invalid && field.$dirty
                    }
                }
            },
            validateEnrolment () {
                this.$v.$touch()

                if (!this.$v.$invalid) {
                    this.saveEnrolment()
                }
            },
            saveEnrolment() {
                let app = this
                app.sending = true
                app.addEnrolment(this.form)
                .then((id) => {
                    app.sending = false
                    app.success = true
                    this.$router.replace({
                        path: `/enrolment/show/${id}`
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
                addEnrolment: 'enrolment/addEnrolment'
            })
        },
        components: {
            CourseAutocomplete,
            LecturerAutocomplete
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
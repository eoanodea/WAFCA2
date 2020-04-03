<template>
    <form novalidate class="signin md-layout" @submit.prevent="validateEnrolment">
        <md-card class="md-layout-item md-size-50 md-small-size-100">
        <md-card-header>
          <div class="md-title">Edit Enrolment</div>
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

            <md-field :class="getValidationClass('status')">
                <md-select v-model="form.status" name="status" id="status">
                    <md-option class="capitalize" v-for="(status, i) in statusOptions" v-bind:key="i" :value="status" selected>{{status.replace('_', ' ')}}</md-option>
                </md-select>
                <span class="md-error" v-if="$v.form.status.minLength">Status must be at least {{$v.form.status.$params.minLength.min}} characters</span>
            </md-field>
            <course-autocomplete v-bind:edit="form.course" v-on:item-selected="onSelect" />
            <lecturer-autocomplete v-bind:edit="form.lecturer" v-on:item-selected="onSelect" />
        </div>
        </md-card-content>

        <md-card-actions>
            <md-button class="md-raised md-accent" :disabled="sending" @click="resetForm()">Reset</md-button>
            <md-button type="submit" class="md-raised md-primary" :disabled="sending">Save</md-button>
        </md-card-actions>

        </md-card>
        <md-snackbar :md-active.sync="success">Update Successful!</md-snackbar>
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
        name: 'enrolmentEdit',
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
        /**
         * Check if enrolment is null
         * If so, fetch the enrolment from the vueX store
         */
        created() {
            if(!this.enrolment) {
                this.loadEnrolment()
            } else this.form = this.enrolment
        },
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
            resetForm () {
                this.loadEnrolment()
            },
            loadEnrolment () {
                this.$store.dispatch('enrolment/loadEnrolment', parseInt(this.$route.params.id)).then(() => {
                    this.form = this.enrolment
                })
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
                app.updateEnrolment([parseInt(app.$route.params.id), this.form])
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
                updateEnrolment: 'enrolment/updateEnrolment'
            })
        },
        computed: {
            ...mapGetters({
                enrolment: 'enrolment/enrolment',
                loading: 'enrolment/loading',
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
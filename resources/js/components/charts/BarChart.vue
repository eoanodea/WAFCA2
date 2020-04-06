<script>
    import { Line } from 'vue-chartjs'
    import { mapGetters } from 'vuex'
    
    export default {
        name: 'bar-chart',
        extends: Line,
        data: () => ({
            chartData: {
                labels: 
                [],
                // ['Janurary', 'Feburary'],
                datasets:
                [],
                // [
                //     {
                //         label: 'Data One',
                //         backgroundColor: '#f87979',
                //         data: [40, 20]
                //     },
                //     {
                //         label: 'Data Two',
                //         backgroundColor: '#f87979',
                //         data: [40, 20]
                //     }
                // ],
                options: {responsive: true}
            },
        }),
        created () {
            const app = this
            if(app.courses.length < 1) {
                app.$store.dispatch('course/loadCourses').then(() => {
                   app.populateChart()
                })
            } else app.populateChart()
            // this.renderChart(app.chartData)

        },
        methods: {
            populateChart() {
                console.log('runing!!')
                const {courses} = this
                let {chartData} = this
                const months = Array.from(Array(11).keys())

                months.map(month => {

                    courses.map((dat, i) => {
                        // if(i < 5) {
                            const enrolments = dat.enrolments.filter(enrolment => {
                                
                                return enrolment.date.includes(`-${month > 9 ? month : ('0' + month)}-`)
                            })

                            // if()
                            chartData.datasets.filter(data => data.label === dat.title).length < 1
                                ? chartData.datasets.push({
                                    label: dat.title,
                                    data: [enrolments.length]
                                })
                                : chartData.datasets.map(data => {
                                    if(data.label === dat.title) {
                                        console.log('pushing enrolments!', enrolments.length, dat.title, month)

                                        return data.data.push(enrolments.length)
                                    }
                                })
                        // }
                    })                        

                    chartData.labels.push(month)
                })

                this.renderChart(chartData)
            }
        },
        computed: {
            ...mapGetters({
                courses: 'course/courses',
                loading: 'course/loading',
                error: 'course/error'
            })
        }
    }
</script>
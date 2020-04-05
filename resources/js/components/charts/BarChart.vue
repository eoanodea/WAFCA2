<script>
    import { Bar } from 'vue-chartjs'
    import { mapGetters } from 'vuex'
    
    export default {
        name: 'bar-chart',
        extends: Bar,
        data: () => ({
            chartData: {
                labels: [],
                //['Janurary', 'Feburary'],
                datasets: [],
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
        },
        methods: {
            populateChart() {
                console.log('runing!!')
                const {courses} = this
                let {chartData} = this
                courses.map(dat => {
                    chartData.labels.push(dat.title)
                    chartData.datasets.push({
                        label: dat.title,
                        data: [dat.enrolments.length]
                    })
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
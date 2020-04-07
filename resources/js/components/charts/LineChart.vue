<script>
  import { Line } from "vue-chartjs";
  import { mapGetters } from "vuex";

  export default {
    name: "line-chart",
    props: ['courses'],
    extends: Line,
    data: () => ({
      colours: [
        "#ffc246",
        "#448aff",
        "#d81b60",
        "#ff6488",
        "#52a3ff",
        "#ffba44",
      ],
      chartData: {
        labels: [],
        datasets: [],
        options: { responsive: true }
      }
    }),
    created() {
      this.populateChart()
    },
    methods: {
      populateChart() {
        const { courses, colours } = this;
        let { chartData } = this;
        const months = Array.from(Array(7).keys());

        months.map(month => {
          courses
            .filter((dat, i) => dat.enrolments.length > 0 && i < 5)
            .map((dat, i) => {
              const courseColor =
                colours.length < i
                  ? colours[Math.floor(Math.random() * colours.length)]
                  : colours[i];

              const enrolments = dat.enrolments.filter(enrolment => {
                return enrolment.date.includes(
                  `-${month > 9 ? month : "0" + month}-`
                );
              });

              chartData.datasets.filter(data => data.label === dat.title).length <
              1
                ? chartData.datasets.push({
                    label: dat.title,
                    borderColor: courseColor,
                    backgroundColor: "#ff000000",
                    data: [enrolments.length]
                  })
                : chartData.datasets.map(data => {
                    if (data.label === dat.title) {
                      return data.data.push(enrolments.length);
                    }
                  });
            });

          chartData.labels.push(month);
        });
        
        this.$nextTick(() => {      
          this.renderChart(chartData);
        })
      }
    },

  };
</script>
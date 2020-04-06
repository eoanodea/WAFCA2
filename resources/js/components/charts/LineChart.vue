<script>
import { Line } from "vue-chartjs";
import { mapGetters } from "vuex";

export default {
  name: "line-chart",
  extends: Line,
  data: () => ({
    colours: [
      "#ffc246",
      "#448aff",
      "#d81b60",
      "#ff6488",
      "#52a3ff",
      "#ffba44",
      "#1bd893",
      "#55f5c0",
      "#b3d876",
      "#bd90e8",
      "#d44a20",
      "#274c01",
      "#3a52dc",
      "#ceda2e",
      "#903fb2",
      "#4e6d6f"
    ],
    chartData: {
      labels: [],
      datasets: [],
      options: { responsive: true }
    }
  }),
  created() {
    const app = this;
    if (app.courses.length < 1) {
      app.$store.dispatch("course/loadCourses").then(() => {
        app.populateChart();
      });
    } else app.populateChart();
    // this.renderChart(app.chartData)
  },
  methods: {
    populateChart() {
      console.log("runing!!");
      const { courses, colours } = this;
      let { chartData } = this;
      const months = Array.from(Array(7).keys());

      months.map(month => {
        courses
          .filter((dat, i) => (dat.enrolments.length > 0 && i < 5))
          .map((dat, i) => {
            const courseColor =
              colours.length > i
                ? colours[Math.floor(Math.random() * colours.length)]
                : colours[i];
  
            console.log(colours.length > i && courseColor);
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
                    console.log(
                      "pushing enrolments!",
                      enrolments.length,
                      dat.title,
                      month
                    );

                    return data.data.push(enrolments.length);
                  }
                });
            // }
          });

        chartData.labels.push(month);
      });

      this.renderChart(chartData);
    }
  },
  computed: {
    ...mapGetters({
      courses: "course/courses",
      loading: "course/loading",
      error: "course/error"
    })
  }
};
</script>
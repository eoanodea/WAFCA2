<script>
import { Pie } from "vue-chartjs";
import { mapGetters } from "vuex";

export default {
  name: "pie-chart",
  extends: Pie,
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
    if (app.enrolments.length < 1) {
      app.$store.dispatch("enrolment/loadEnrolments").then(() => {
        app.populateChart();
      });
    } else app.populateChart();
    // this.renderChart(app.chartData)
  },
  methods: {
    populateChart() {
      console.log("runing!!");
      const { enrolments, colours } = this;
      let { chartData } = this;
      

      enrolments.map((enrolment, i) => {
        const enrolmentColor =
          colours.length > i
            ? colours[Math.floor(Math.random() * colours.length)]
            : colours[i];

        if(chartData.datasets.filter(data => data.label === enrolment.status).length < 1) {
            chartData.datasets.push({
              label: enrolment.status,
              backgroundColor: enrolmentColor,
              data: [1]
            })

            chartData.labels.push(enrolment.status)
        } else {
          chartData.datasets.map(data => {
              if (data.label === enrolment.status) {
                const num = (data.data[data.data.length -1] + 1)
                console.log('num!', data.data.length)
                return data.data.push(num)
                
              }
          });
        }
      })

      // months.map(month => {
      //   enrolments
      //     .filter((dat, i) => (dat.enrolments.length > 0 && i < 5))
      //     .map((dat, i) => {
      //       const enrolmentColor =
      //         colours.length > i
      //           ? colours[Math.floor(Math.random() * colours.length)]
      //           : colours[i];
  
      //       console.log(colours.length > i && enrolmentColor);
      //       const enrolments = dat.enrolments.filter(enrolment => {
      //         return enrolment.date.includes(
      //           `-${month > 9 ? month : "0" + month}-`
      //         );
      //       });

      //       chartData.datasets.filter(data => data.label === dat.title).length <
      //       1
      //         ? chartData.datasets.push({
      //             label: dat.title,
      //             borderColor: enrolmentColor,
      //             backgroundColor: "#ff000000",
      //             data: [enrolments.length]
      //           })
      //         : chartData.datasets.map(data => {
      //             if (data.label === dat.title) {
      //               console.log(
      //                 "pushing enrolments!",
      //                 enrolments.length,
      //                 dat.title,
      //                 month
      //               );

      //               return data.data.push(enrolments.length);
      //             }
      //           });
      //       // }
      //     });

      //   chartData.labels.push(month);
      // });

      this.renderChart(chartData);
    }
  },
  computed: {
    ...mapGetters({
      enrolments: "enrolment/enrolments",
      loading: "enrolment/loading",
      error: "enrolment/error"
    })
  }
};
</script>
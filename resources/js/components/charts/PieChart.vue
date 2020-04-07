<script>
  import { Pie } from "vue-chartjs";

  export default {
    name: "pie-chart",
    props: ['enrolments'],
    extends: Pie,
    data: () => ({
      colours: [
        "#ffc246",
        "#448aff",
        "#d81b60",
        "#ff6488",
        "#52a3ff",
        "#ffba44"
      ],
      chartData: {
        labels: [],
        datasets: [
          {
            data: [],
            backgroundColor: []
          }
        ],
        options: { responsive: true }
      }
    }),
    created() {
      this.populateChart()
    },
    methods: {
      populateChart() {
        const { enrolments, colours } = this;
        let { chartData } = this;
        let status = [];
        enrolments.map((enrolment, i) => {
          if (status.filter(data => data.label === enrolment.status).length < 1) {
            status.push({
              label: enrolment.status,
              count: 1
            });
          } else {
            const index = status.findIndex((e) => e.label === enrolment.status);
            let count = status[index].count;
            count = count + 1;
            
            status[index] = { label: status[index].label, count: count };
          }
        });
        status.map((dat, i) => {
          chartData.labels.push(dat.label.replace('_', ' '));
          chartData.datasets[0].data.push(dat.count);
          chartData.datasets[0].backgroundColor.push(colours[i])
        });
        
        this.$nextTick(() => {      
            this.renderChart(chartData);

        })
      }
    }
  };
</script>
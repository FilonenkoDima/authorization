export const legendsColor = ['rgba(255, 87, 51, 0.75)', 'rgb(51, 255, 87, 0.75)', 'rgb(51, 87, 255, 0.75)', 'rgb(255, 51, 168, 0.75)'];
export const chartOptions = {
  responsive: true,
  scales: {
    x: {
      beginAtZero: true
    }
  },
  plugins: {
    legend: {
      labels: {
        color: 'rgba(0, 0, 0, 0.7)'
      }
    }
  }
};

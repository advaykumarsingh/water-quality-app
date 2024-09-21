
  const chartOptionsGeneric = (title, selectedStreets) => ({
    title: title,
    titleTextStyle: {
        color: 'Navy', // Change to your desired color for the title
        fontSize: 26, // Optional: change font size
      },
    hAxis: { title: 'Date' },
    vAxis: { title: title},
    curveType: 'function',
    interpolateNulls: true, // Connect lines across missing data points
    legend: { position: 'top', alignment: 'right' }, // Customize legend position
    series: selectedStreets.flatMap((street, index) => ({
      [`${index * 2 + 1}`]: { label: `${street} - ` },
    })).reduce((acc, cur) => ({ ...acc, ...cur }), {}), // Flatten the series configuration
  });

  export { chartOptionsGeneric };
  
google.charts.load("current", { packages: ["corechart"] });
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
    var data = google.visualization.arrayToDataTable([
        ['จังหวัด', 'งบประมาณ (บาท)'],
        ['งบประมาณจังหวัดฉะเชิงเทรา (เฉลี่ยปี 2550-2562)', 7610687084.38462],
        ['งบประมาณจังหวัดชลบุรี (เฉลี่ยปี 2550-2562)', 18589163849.2564],
        ['งบประมาณจังหวัดระยอง (เฉลี่ยปี 2550-2562)', 6079380855.8718],
    ]);

    var options = {
        title: 'งบประมาณแบ่งตามจังหวัด',
        pieHole: 0.5, 
        width: 900,
        height: 500
    };

    data.sort([{ column: 1 }]);

    var chart = new google.visualization.PieChart(document.getElementById('east1_budget'));
    chart.draw(data, options);
}
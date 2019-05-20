google.charts.load('42', { 'packages': ['bar'] });
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
    var data = google.visualization.arrayToDataTable([
        ['จังหวัด', 'อัตราการเติบโต (%)'],
        ['จังหวัดฉะเชิงเทรา',21.0833333333333],
        ['จังหวัดชลบุรี',13.8333333333333],
        ['จังหวัดระยอง',18.8333333333333],
        
    ]);

    var options = {
        chart: {
            title: 'อัตราการเติบโตของงบประมาณของจังหวัดในกลุ่มจังหวัดภาคตะวันออกกลุ่ม 1',
        },
        width: 900,
        height: 500
    };

    var chart = new google.charts.Bar(document.getElementById('east1_growth'));

    chart.draw(data, google.charts.Bar.convertOptions(options));
}
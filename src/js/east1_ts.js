google.charts.load('42', { packages: ['corechart', 'line'] });
google.charts.setOnLoadCallback(drawCurveTypes);

function drawCurveTypes() {
    var data = new google.visualization.DataTable();
    data.addColumn('number', 'ปี');
    data.addColumn('number', 'จังหวัดฉะเชิงเทรา');
    data.addColumn('number', 'จังหวัดชลบุรี');
    data.addColumn('number', 'จังหวัดระยอง');
 

    data.addRows([
        [2550, 2067281364, 7049899079, 1770287880],
        [2551, 2321589773, 6932945114, 2474914922],
        [2552, 1866265648, 5744764688, 2039487271],
        [2553, 2000044303, 5601785390, 1836417084],
        [2554, 2762648745, 7492559937, 2420711236],
        [2555, 1601718968, 7966266914, 1459789509],
        [2556, 3253210320, 10520593054, 2830854491],
        [2557, 3480006613, 10636317038, 2811685608],
        [2558, 5260581196, 19833218806, 4367540505],
        [2559, 6595546353, 21117946190, 5102737507],
        [2560, 4693341380, 15734088199, 4119615350],
        [2561, 8483690268, 19340379914, 6690128600],
        [2562, 10153064134, 23970120494, 8014286544]

    ]);

    var options = {
        width: "100%",
        height: 900,
        hAxis: {
            title: 'Year',
            format: '####'
        },
        vAxis: {
            title: 'งบประมาณ',
        },
        series: {
            1: { curveType: 'function' }
        }
    };

    var chart = new google.visualization.LineChart(document.getElementById('east1_ts'));
    chart.draw(data, options);
}
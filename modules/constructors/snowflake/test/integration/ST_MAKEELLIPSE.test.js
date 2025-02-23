const { runQuery } = require('../../../../../common/snowflake/test-utils');

test('ST_MAKEELLIPSE should work', async () => {
    const query = `
        SELECT ST_MAKEELLIPSE(ST_POINT(-73.9385,40.6643), 5, 3, -30, 'miles', 20) as ellipse1,
               ST_MAKEELLIPSE(ST_POINT(13.9385,0.6643), 10, 2, 15, 'kilometers', 10) as ellipse2,
               ST_MAKEELLIPSE(ST_POINT(53.9385,-10.6643), 8, 7, 100, 'miles', 15) as ellipse3
    `;
    const rows = await runQuery(query);
    expect(rows.length).toEqual(1);
    expect(JSON.stringify(rows[0].ELLIPSE1)).toEqual('{"coordinates":[[[-73.85585757866869,40.700482895785946],[-73.88788031891363,40.71559123956501],[-73.91889887799624,40.715369325333555],[-73.93974338199814,40.71135724984175],[-73.95473526415299,40.70678926134153],[-73.96712847945616,40.701902368319736],[-73.97890459560426,40.696206426299455],[-73.9916134686199,40.6886451333642],[-74.0066091031436,40.67696331688353],[-74.022354519163,40.6567055668297],[-74.0210975999164,40.62811710421404],[-73.98910618915403,40.61299762139349],[-73.95811030583167,40.61322007756026],[-73.93727352155338,40.617235728964765],[-73.92228285678226,40.621807329901394],[-73.9098876562536,40.626697631680265],[-73.89810694589482,40.63239698245761],[-73.88538988292714,40.63996188782929],[-73.87037962661134,40.65164728022265],[-73.85461048881956,40.67190557221179],[-73.85585757866869,40.700482895785946]]],"type":"Polygon"}');
    expect(JSON.stringify(rows[0].ELLIPSE2)).toEqual('{"coordinates":[[[14.025373313296427,0.6410238762219517],[13.9660437436047,0.6748733671892979],[13.948778870154683,0.6801276857555806],[13.937512624613191,0.6831462592962737],[13.919933439358374,0.6872277359424784],[13.85162627750276,0.6875761237780484],[13.910956234422315,0.6537266544884955],[13.928221142307848,0.6484723197264373],[13.939487392081674,0.6454537352217085],[13.95706655540448,0.641372242379728],[14.025373313296427,0.6410238762219517]]],"type":"Polygon"}');
    expect(JSON.stringify(rows[0].ELLIPSE3)).toEqual('{"coordinates":[[[53.91803688489085,-10.778326228148556],[53.96701702637404,-10.773654819139944],[54.00625992002597,-10.748026503799485],[54.03078270631681,-10.711931865009936],[54.04145745683627,-10.671555947332156],[54.038529875163135,-10.629345771321681],[54.01964418094167,-10.58854619991272],[53.982717695860515,-10.557822804600134],[53.93399836162621,-10.54938828146205],[53.88860931879128,-10.565856439638315],[53.856668638982455,-10.597845633618306],[53.83923141259913,-10.636516850059445],[53.83521147600925,-10.678034498409696],[53.84569060731951,-10.720186959560534],[53.87364152301882,-10.757461202884317],[53.91803688489085,-10.778326228148556]]],"type":"Polygon"}');
});

test('ST_MAKEELLIPSE should return NULL if any NULL mandatory argument', async () => {
    const query = `
        SELECT ST_MAKEELLIPSE(NULL, 5, 3, -30, 'miles', 80) as ellipse1,
               ST_MAKEELLIPSE(ST_POINT(-73.9385,40.6643), NULL, 3, -30, 'miles', 80) as ellipse2,
               ST_MAKEELLIPSE(ST_POINT(-73.9385,40.6643), 5, NULL, -30, 'miles', 80) as ellipse3,
               ST_MAKEELLIPSE(ST_POINT(-73.9385,40.6643), 5, 3, NULL, 'miles', 80) as ellipse4,
               ST_MAKEELLIPSE(ST_POINT(-73.9385,40.6643), 5, 3, -30, NULL, 80) as ellipse5,
               ST_MAKEELLIPSE(ST_POINT(-73.9385,40.6643), 5, 3, -30, 'miles', NULL) as ellipse6
    `;
    const rows = await runQuery(query);
    expect(rows.length).toEqual(1);
    expect(rows[0].ELLIPSE1).toEqual(null);
    expect(rows[0].ELLIPSE2).toEqual(null);
    expect(rows[0].ELLIPSE3).toEqual(null);
    expect(rows[0].ELLIPSE4).toEqual(null);
    expect(rows[0].ELLIPSE5).toEqual(null);
    expect(rows[0].ELLIPSE6).toEqual(null);
});

test('ST_MAKEELLIPSE default values should work', async () => {
    const query = `
        SELECT ST_MAKEELLIPSE(ST_POINT(-73.9385,40.6643), 5, 3, 0, 'kilometers', 64) as defaultValue,
               ST_MAKEELLIPSE(ST_POINT(-73.9385,40.6643), 5, 3) as nullParam1,
               ST_MAKEELLIPSE(ST_POINT(-73.9385,40.6643), 5, 3, 0) as nullParam2,
               ST_MAKEELLIPSE(ST_POINT(-73.9385,40.6643), 5, 3, 0, 'kilometers') as nullParam3
    `;
    const rows = await runQuery(query);
    expect(rows.length).toEqual(1);
    expect(rows[0].NULLPARAM1).toEqual(rows[0].DEFAULTVALUE);
    expect(rows[0].NULLPARAM2).toEqual(rows[0].DEFAULTVALUE);
    expect(rows[0].NULLPARAM3).toEqual(rows[0].DEFAULTVALUE);
});
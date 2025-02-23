const { runQuery } = require('../../../../../common/snowflake/test-utils');
const fixturesIn = require('./delaunay_fixtures/in');
const fixturesOut = require('./delaunay_fixtures/out');

test('ST_DELAUNAYLINES should work', async () => {
    const query = `WITH delaunay AS (
        SELECT ST_DELAUNAYLINES(${fixturesIn.input1})
        AS delaunayArray
      )
      SELECT ST_ASWKT(TO_GEOGRAPHY(unnested.VALUE)) AS geom
      FROM delaunay, LATERAL FLATTEN(input => delaunayArray) AS unnested`
    
    const rows = await runQuery(query);
    expect(rows.length).toEqual(fixturesOut.expectedTriangles1.length);
    expect(rows.map(item => item.GEOM)).toEqual(fixturesOut.expectedTriangles1);
});

test('ST_DELAUNAYLINES should return an empty array if passed an empty array geometry', async () => {
    const query = 'SELECT ST_DELAUNAYLINES(ARRAY_CONSTRUCT()) as delaunay';
    const rows = await runQuery(query);
    expect(rows.length).toEqual(1);
    expect(rows[0].DELAUNAY).toEqual([]);
});
const { runQuery } = require('../../../../../common/bigquery/test-utils');

test('PLACEKEY_TOH3 should work', async () => {
    const query = `
        SELECT \`@@BQ_PREFIX@@carto.PLACEKEY_TOH3\`(placekey) as h3
        FROM UNNEST([
            '@c6z-c2g-dgk', '@63m-vc4-z75', '@7qg-xf9-j5f', '@bhm-9m8-gtv',
            '@h5z-gcq-kvf', '@7v4-m2p-3t9', '@hvb-5d7-92k', '@ab2-k43-xqz'
        ]) as placekey
    `;
    const rows = await runQuery(query);
    expect(rows.map(r => r.h3)).toEqual([
        '8a62e9d08a1ffff', '8a2a9c580577fff', '8a3c9ea2bd4ffff', '8a5b4c1047b7fff',
        '8a8e8116a6d7fff', '8a3e0ba6659ffff', '8a961652a407fff', '8a01262c914ffff'
    ]);
});

test('PLACEKEY_TOH3 returns null with invalid input', async () => {
    const query = `
        SELECT \`@@BQ_PREFIX@@carto.PLACEKEY_TOH3\`(placekey) as h3
        FROM UNNEST([
            NULL, '@abc', 'abc-xyz', 'abcxyz234', 'abc-345@abc-234-xyz',
            'ebc-345@abc-234-xyz', 'bcd-345@', '22-zzz@abc-234-xyz'
        ]) as placekey
    `;
    const rows = await runQuery(query);
    expect(rows.map(r => r.h3)).toEqual([
        null, null, null, null, null, null, null, null
    ]);
});
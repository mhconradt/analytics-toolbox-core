----------------------------
-- Copyright (C) 2021 CARTO
----------------------------

CREATE OR REPLACE FUNCTION `@@BQ_PREFIX@@carto.QUADINT_TOQUADKEY`
(quadint INT64)
RETURNS STRING
DETERMINISTIC
LANGUAGE js
OPTIONS (library=["@@BQ_LIBRARY_BUCKET@@"])
AS """
    if (quadint == null) {
        throw new Error('NULL argument passed to UDF');
    }
    return quadkeyLib.quadkeyFromQuadint(quadint);
""";
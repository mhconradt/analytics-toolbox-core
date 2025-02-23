----------------------------
-- Copyright (C) 2021 CARTO
----------------------------

CREATE OR REPLACE FUNCTION _S2_FROMHILBERTQUADKEY
(quadkey STRING)
RETURNS STRING
LANGUAGE JAVASCRIPT
IMMUTABLE
AS $$
    if (!QUADKEY) {
        throw new Error('NULL argument passed to UDF');
    }

    @@SF_LIBRARY_CONTENT@@

    return s2Lib.keyToId(QUADKEY);
$$;

CREATE OR REPLACE SECURE FUNCTION S2_FROMHILBERTQUADKEY
(quadkey STRING)
RETURNS BIGINT
IMMUTABLE
AS $$
    CAST(_S2_FROMHILBERTQUADKEY(QUADKEY) AS BIGINT)
$$;
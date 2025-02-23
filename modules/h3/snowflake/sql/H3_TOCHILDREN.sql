----------------------------
-- Copyright (C) 2021 CARTO
----------------------------

CREATE OR REPLACE FUNCTION _H3_TOCHILDREN
(index STRING, resolution DOUBLE)
RETURNS ARRAY
LANGUAGE JAVASCRIPT
IMMUTABLE
AS $$
    if (!INDEX) {
        return [];
    }

    @@SF_LIBRARY_TOCHILDREN@@

    if (!h3Lib.h3IsValid(INDEX)) {
        return [];
    }

    return h3Lib.h3ToChildren(INDEX, Number(RESOLUTION));
$$;

CREATE OR REPLACE SECURE FUNCTION H3_TOCHILDREN
(index STRING, resolution INT)
RETURNS ARRAY
IMMUTABLE
AS $$
    _H3_TOCHILDREN(INDEX, CAST(RESOLUTION AS DOUBLE))
$$;
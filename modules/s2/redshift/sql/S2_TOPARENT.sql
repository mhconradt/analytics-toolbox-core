----------------------------
-- Copyright (C) 2021 CARTO
----------------------------

CREATE OR REPLACE FUNCTION @@RS_PREFIX@@carto.S2_TOPARENT
(id INT8, resolution INT4) 
RETURNS INT8
STABLE
AS $$
    from @@RS_PREFIX@@s2Lib import to_parent

    if id is None or resolution is None:
        raise Exception('NULL argument passed to UDF')
    
    return to_parent(id, resolution)
    
$$ LANGUAGE plpythonu;

CREATE OR REPLACE FUNCTION @@RS_PREFIX@@carto.S2_TOPARENT
(id INT8)
RETURNS INT8
STABLE
AS $$
    from @@RS_PREFIX@@s2Lib import to_parent

    if id is None:
        raise Exception('NULL argument passed to UDF')
    
    return to_parent(id)
    
$$ LANGUAGE plpythonu;

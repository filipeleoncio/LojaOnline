import React from 'react';
import { Grid, GridColumn } from 'semantic-ui-react';

const PageCenter = ( { children } ) => {
    return (
        <Grid>
            <GridColumn width={ 4 } />
            <GridColumn width={ 8 }>
                { children }
            </GridColumn>
            <GridColumn width={ 4 } />
        </Grid>
    )
}

export default PageCenter;

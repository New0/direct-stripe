import { __ } from '@wordpress/i18n';
import { Grid, GridCell } from '@rmwc/grid';
import '@rmwc/grid/styles';

export const ButtonEditor = ( props ) => {
	
	return ( 
		<Grid>
			<GridCell tablet={12} desktop={4}>1</GridCell>
			<GridCell tablet={12} desktop={4}>2</GridCell>
			<GridCell tablet={12} desktop={4}>3</GridCell>
		</Grid>
	);
}
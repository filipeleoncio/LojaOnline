function exibePreco ( number ) {
    return "R$ " + new Intl.NumberFormat( 'de-DE' ).format( number );
}

export default exibePreco;

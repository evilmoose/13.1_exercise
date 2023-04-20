// movies.js
let movies = [];
let id = 0;

$( function() {

  $( "#new-movie-form" ).on( "submit", ( event ) => {
    event.preventDefault();
    let title = $( "#title" ).val();
    let rating = $( "#rating" ).val();

    let movieData = { title, rating, id };
    const HTMLtoAppend = create( movieData );

    id++
    movies.push(movieData);

    $( "#movie-table-body" ).append( HTMLtoAppend );
    $("#new-movie-form" ).trigger( "reset" );
  });

  $( "tbody" ).on( "click", ".btn.btn-danger", ( event ) => {

    let indexToRemoveAt = movies.findIndex( movie => movie.id === +$( event.target ).data( "deleteId" ) );
    
    movies.splice( indexToRemoveAt, 1 )
    
    $(event.target)
      .closest( "tr" )
      .remove();
    
  });

  $( ".fas" ).on( "click", ( event ) => {
    
    let direction = $( event.target ).hasClass( "fa-sort-down" ) ? "down" : "up";
    let key = $( event.target ).attr( "id" );
    let sorted = sort( movies, key, direction );
    
    $( "#movie-table-body" ).empty();

    for ( let movie of sorted ) {
      const HTMLtoAppend = create( movie );
      $( "#movie-table-body" ).append( HTMLtoAppend );
    }

    $( event.target ).toggleClass( "fa-sort-down" );
    $( event.target ).toggleClass( "fa-sort-up" );
  });
});

// Sort function
const sort = ( arr, key, dir ) => {
  return arr.sort( ( a, b ) => {

    if (key === "rating") {
      a[ key ] = +a[ key ];
      b[ key ] = +b[ key ];
    }

    if ( a[ key ] > b[ key ] ) {
      return dir === "up" ? 1 : -1;
    } 
    else if ( b[ key ] > a[ key ] ) {
      return dir === "up" ? -1 : 1;
    }

    return 0;
  });
}

const create = ( data ) => {
  return `
    <tr>
      <td>${data.title}</td>
      <td>${data.rating}</td>
      <td>
        <button class="btn btn-danger" data-delete-id=${data.id}>
          Delete
        </button>
      </td>
    <tr>
  `;
}

$(document).ready(function () { 

 
        // Função para carregar as notícias 
        function carregarNoticias() { 
            $.get("http://localhost:3000/animais", function (data, status) { 
                $('#bixo').empty(); 
                $('#bixo').append('<h1>Listagem de Animais</h1>'); 
                data.forEach(function (animal) { 
                    $('#bixo').append( 
                        `<div class="card-animal"> 
                            <h3>${animal.raca}</h3> 
                            <p>${animal.tipo}</p> 
                            <p>${animal.caracteristicas}</p> 
                        </div>` 
                    ); 
                }); 
            }); 
        } 
                                                
        // Carregar as notícias ao carregar a página 
        carregarNoticias(); 
}); 
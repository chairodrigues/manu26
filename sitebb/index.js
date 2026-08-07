// Importação dos módulos necessários 
const express = require('express'); 
const fs = require('fs'); // Módulo para manipulação de arquivos 
const cors = require('cors'); // Mecanismo de segurança para permitir CORS 
const { parse } = require('path');
                                                
                                                 
// Criação da aplicação e configuração da porta 
const app = express(); 
const PORT = 3000; 
                                                
                                               
// Permitir CORS 
app.use(cors()); 
                                                
                                                 
// Middleware para interpretar JSON 
app.use(express.json());

const filePath = './animais.json';

 
// Lê os dados do arquivo JSON 
const readData = () => { 
    //TENTA LER
    try { 
        //tenta ler arquivo que esta no caminho 
        const data = fs.readFileSync(filePath, 'utf8'); // Lê o conteúdo do arquivo 
        return JSON.parse(data || '[]'); // Converte para objeto/array ou retorna um array vazio 
      }//pegar erro 
       catch (error) { 
        //fala qual erro pegou
        console.error('Erro ao ler o arquivo:', error); 
        return []; 
      } 
}; 
                                                
                                                 
// Grava os dados no arquivo JSON 
const writeData = (data) => { 
    try { 
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2)); // Grava com formatação 
      } catch (error) { 
        console.error('Erro ao escrever no arquivo:', error); 
      } 
};

//GET = pede alguma coisa
app.get('/animais', (req, res) => { 
    const animais = readData(); 
    res.json(animais); 
}); 
app.get('/animais/:id', (req, res) => { 
    const { id } = req.params; 
    const animais = readData(); 
    const animal = animais.find((n) => n.id === (id)); 
                                                    
                                                     
    if (!animal) { 
        return res.status(404).json({ message: 'Pet não encontrado.' });
    } 
                                                    
                                                     
    res.json(animal);                                          
}); 

//POST = enviar alguma coisa
app.post('/animais', (req, res) => { 
    const { raca, tipo, caracteristicas } = req.body; 
                                                    
    // Validações básicas ( quando tu faz um envio, precisa ter esses campos)
    if (!raca || !tipo || !caracteristicas) { 
        return res.status(400).json({ message: 'Raça, tipo e características são obrigatórios.' }); 
   } 
                                                    
    const animais = readData(); 
    const novoanimal = { 
        id: animais.length > 0
            ? String(parseInt(animais[animais.length - 1].id) + 1) // Incrementa o último ID
            : '1', // Se não houver animais, começa com ID 1
        raca, 
        tipo, 
        caracteristicas
   }; 
                                                    
    animais.push(novoanimal); 
    writeData(animais); 
                                                    
    res.status(201).json(novoanimal); 
                                                    
}); 

//PUT = adicionar alguma coisa no que tu ja mandou 
app.put('/animais/:id', (req, res) => { 
    const { id } = req.params; 
    const { raca, tipo, caracteristicas } = req.body; 

    // Validações básicas 
    if (!raca && !tipo && !caracteristicas) { 
    return res.status(400).json({ message: 'É necessário informar a raça, o tipo ou as características para atualização.' }); 
    } 
                                                      
                                                    
    const animais = readData(); 
    const animalIndex = animais.findIndex((n) => n.id === (id)); 
                                                                                                  
    if (animalIndex === -1) { 
      return res.status(404).json({ message: 'Bixo não encontrado.' }); 
    } 
                                                    
                                                    
    // Atualizar apenas os campos fornecidos 
    if (raca) animais[animalIndex].raca = raca; 
    if (tipo) animais[animalIndex].tipo = tipo; 
    if (caracteristicas) animais[animalIndex].caracteristicas = caracteristicas; 
                                                                                                    
    writeData(animais); 
                                                    
    res.json({ 
      message: 'Bixo atualizado com sucesso.', 
      animal: animais[animalIndex], 
                                                    
    }); 
}); 

//DELETE = excluir alguma coisa
app.delete('/animais/:id', (req, res) => { 
    const { id } = req.params; 
    const animais = readData(); 
    const index = animais.findIndex((n) => n.id === (id)); 
                                                                                                   
    if (index === -1) { 
        return res.status(404).json({ message: 'Bixo não encontrado.' }); 
    } 

    animais.splice(index, 1);
    writeData(animais);

    res.json({ message: 'Bixin removido com sucesso.' }); 
}); 


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


app.listen(PORT, () => { 
    console.log(`Servidor rodando em http://localhost:${PORT}`); 
});          
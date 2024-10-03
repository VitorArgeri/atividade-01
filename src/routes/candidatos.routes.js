import { Router } from "express"

const candidatosRoutes = Router()

let candidatos = [
    {
        id: Math.floor(Math.random() * 1000000),
        nome: 'Capitâ Lucimara',
        partido: 'PSD',
        idade: 39,
        segundoMandato: true, // Concorrente ao segundo mandato
        proposta: [
            'Aumento do salário mínimo',
            'Redução de impostos',
            'Mais investimentos em educação'
        ]
    },
    
    {
        id: Math.floor(Math.random() * 1000000),
        nome: 'Franklin',
        partido: 'PL',
        idade: 48,
        segundoMandato: false,
        proposta: [
            'Mais investimentos no saneamento',
            'Diminuição nos alagamentos',
            'Aumento de espaços de lazer'
        ]
    },

    {
        id: Math.floor(Math.random() * 1000000),
        nome: 'Alécio Cau',
        partido: 'PSB',
        idade: 38,
        segundoMandato: true,
        proposta: [
            'Mais faixas de pedestre',
            'Melhora da gestão pública',
            'Investimentos na segurança da cidade'
        ]
    }
]

// Rota para buscar todos os candidatos
candidatosRoutes.get("/", (req, res) => {
    return res.status(200)
    .send( candidatos ) 
})

// Criar um novo candidato

candidatosRoutes.post("/", (req, res) => {
    // Validação dos campos de nome e idade

    const{ nome, partido, idade, segundoMandato, proposta } = req.body
        const novoCandidato = {
        id: Math.floor(Math.random() * 1000000),
        nome: nome,
        partido: partido,
        idade: idade,
        segundoMandato: segundoMandato,
        proposta: proposta
    }

    if (!nome || !idade) {
        return res.status(400).send({
            message: 'O Nome ou o Partido não foi preenchido'
        })
    }

    if(idade < 18) {
        return res.status(400).send({
            message: 'Candidato menor de idade'
        })
    }
    
    candidatos.push(novoCandidato)
        return res.status(201)
        .json( novoCandidato )

    })


// Rota para buscar um candidato pelo id
candidatosRoutes.get("/:id", (req, res) => {
    const {id} = req.params;
    // console.log(id)
    const candidato = candidatos.find((candidate) => candidate.id == id)

    if(!candidato) {
        return res.status(404).send({
            message: "Candidato não Encontrado!"
        });
    }

    return res.status(200).send({
        message: "Candidato Encontrado!",
        candidato,
    });
})

candidatosRoutes.put('/:id', (req, res) => {
    const { id } = req.params;

    const candidato = candidatos.find((candidate) => candidate.id == id)

    if(!candidato) {
        return res.status(404).send({
            message: 'Candidato não Encontrado!'
        });
    }

    const{ nome, partido, idade, segundoMandato, proposta } = req.body
        candidato.nome = nome;
        candidato.partido = partido;
        candidato.idade = idade;
        candidato.segundoMandato = segundoMandato;
        candidato.proposta = proposta;

    if(idade < 18) {
        return res.status(400).send({
            message: 'Candidato menor de idade'
        })
    }

    else {
        return res.status(201).send({
            message: 'Candidato Atualizado!'
        })
    }

})



candidatosRoutes.delete('/:id', (req, res) => {
    const { id } = req.params;

    const candidato = candidatos.find((candidate) => candidate.id == id)

    if(!candidato) {
        return res.status(404).send({
            message: "Candidato não Encontrado!"
        });
    }

    candidatos = candidatos.filter((candidate) => candidate.id != id)

    return res.status(200).send({
        message: 'Candidato Deletado!',
    })
})

export default candidatosRoutes
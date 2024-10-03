import { Router } from "express"

const candidatosRoutes = Router()

let candidatos = [
    {
        id: Math.random() * 1000000,
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
        id: Math.random() * 1000000,
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
        id: Math.random() * 1000000,
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
    if(idade < 18) {
        return res.status(200).send({
            message: 'candidato menor de idade'
        })
    }
    
    else {
        const{ nome, cor } = req.body
        const novocandidato = {
        id: candidatos.length + 1,
        nome: nome,
        partido: partido,
        idade: idade,
        segundoMandato: segundoMandato,
        proposta: proposta
    }

        candidatos.push(novocandidato)
        return res.status(201)
        .send( candidatos ) 
    }
    
})

// Rota para buscar um candidato pelo id
candidatosRoutes.get("/:id", (req, res) => {
    const {id} = req.params;
    // console.log(id)
    const candidato = candidatos.find((candidate) => candidate.id == id)

    if(!candidato) {
        return res.status(404).send({
            message: "candidato não encontrada!"
        });
    }

    return res.status(200).send({
        message: "candidato encontrada!",
        candidato,
    });
})

candidatosRoutes.put('/:id', (req, res) => {
    const { id } = req.params;

    const candidato = candidatos.find((candidate) => candidate.id == id)

    if(!candidato) {
        return res.status(404).send({
            message: 'candidato não encontrada!'
        });
    }

    if(idade < 18) {
        return res.status(200).send({
            message: 'candidato menor de idade'
        })
    } else {
        const{ nome, cor } = req.body
        candidato.nome = nome;
        candidato.cor = cor;

        return res.status(200).send({
        message: 'candidato Atualizada!',
        candidato,
    })
    }

    

})

candidatosRoutes.delete('/:id', (req, res) => {
    const { id } = req.params;

    const candidato = candidatos.find((candidate) => candidate.id == id)

    if(!candidato) {
        return res.status(404).send({
            message: "candidato não encontrada!"
        });
    }

    candidatos = candidatos.filter((candidate) => candidate.id != id)

    return res.status(200).send({
        message: 'candidato Deletada!',
        candidato,
    })
})

export default candidatosRoutes
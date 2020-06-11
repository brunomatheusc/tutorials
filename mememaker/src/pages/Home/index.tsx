import React, { FC, useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { Wrapper, Card, Templates, Form, Button, Meme } from './styles';

import qs from 'qs';

import logo from '../../assets/logo.svg';
import api from '../../services/api';

interface ITemplate {
    id: number;
    name: string;
    url: string;
    box_count: number;
}

const Home: FC = () => {
    const [templates, setTemplates] = useState<ITemplate[]>([]);
    const [selectedTemplate, setSelectedTemplate] = useState<ITemplate>();
    const [boxes, setBoxes] = useState<string[]>([]);
    const [generatedMeme, setGeneratedMeme] = useState<string>('');

    useEffect(() => {
        (async () => {
            const response = await api.get('/get_memes');           
            const { data: { memes } } = response.data;

            setTemplates(memes);
        })();
    }, []);

    const handleInputChange = (index: number) => (e: ChangeEvent<HTMLInputElement>) => {
        const newValues = boxes;
        newValues[index] = e.target.value;
        setBoxes(newValues);
    }

    function handleSelectTemplate(template: ITemplate) {
        setSelectedTemplate(template);
        setBoxes([]);
    }

    function handleReset() {
        setSelectedTemplate(undefined);
        setBoxes([]);
        setGeneratedMeme('');
    }

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();

        const params = qs.stringify({
            template_id: selectedTemplate?.id,
            username: 'vikayel543',
            password: 'vikayel543',
            boxes: boxes.map(text => ({ text })),
        });

        const response = await api.get(`/caption_image?${params}`);
        const { data: { url }} = response.data;

        console.log(response);

        setGeneratedMeme(url);
    }

    async function handleDownload() {
        let blob = await fetch(generatedMeme).then(r => r.blob());
        const url = window.URL.createObjectURL(blob);

        let a = document.createElement('a');

        a.href = url;
        a.download = 'meme.jpg';
        document.body.appendChild(a);
        a.click();
    }

    return (
        <>
            <Wrapper generated={ generatedMeme ? true : false }>
                <img src={ logo } alt="MemeMaker"/>

                <Card>
                    { generatedMeme ? (
                        <>
                            <Meme src={ generatedMeme } alt="Generated Meme"/>
                            <Button onClick={ handleReset }>Criar outro meme</Button>
                            <Button onClick={ handleDownload }>Download meme</Button>
                        </>
                    )
                    : (
                        <>
                            <h2>Selecione um template</h2>
        
                            <Templates>
                                { templates.map((template) => (
                                    <button key={ template.id } onClick={ () => handleSelectTemplate(template) } className={ template.id == selectedTemplate?.id ? 'selected' : '' }>
                                        <img src={ template.url } alt={ template.name } />
                                    </button>
                                ))}
                            </Templates>
        
                            { selectedTemplate && (
                                <>
                                    <h2>Textos</h2>
        
                                    <Form onSubmit={ handleSubmit }>
                                        { (new Array(selectedTemplate.box_count).fill('').map((_, index) => (
                                            <input type="text" key={index} placeholder={ `Text #${index + 1}`} onChange={ handleInputChange(index) } />
                                        )))}
        
                                        <Button type="submit">MakeMyMeme</Button>
                                    </Form>
                                </>
                            )}
                        </>
                    )}

                </Card>
            </Wrapper>
        </>
    );
};

export default Home;
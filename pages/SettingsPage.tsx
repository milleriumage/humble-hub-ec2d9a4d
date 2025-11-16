import React from 'react';
import { useBotStore } from '../store/botStore';
import { AIPersonality, AIProvider } from '../types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { Slider } from '../components/ui/Slider';
import { Select } from '../components/ui/Select';
import { Switch } from '../components/ui/Switch';

export const SettingsPage: React.FC = () => {
    const { bots, activeBotId, updateBotAiSettings, toggleBotAi, updateBotAiProvider } = useBotStore();
    const activeBot = bots.find(b => b.id === activeBotId);

    if (!activeBot) return <div>No bot selected.</div>;

    const handleSettingChange = (key: keyof AIPersonality, value: any) => {
        updateBotAiSettings(activeBot.id, { [key]: value });
    };
    
    const handleProviderChange = (provider: AIProvider) => {
        updateBotAiProvider(activeBot.id, provider);
    }

    const personality = activeBot.personality;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                 <h1 className="text-2xl font-bold">AI Settings for {activeBot.name}</h1>
                <Switch 
                    checked={activeBot.isAiEnabled}
                    onChange={() => toggleBotAi(activeBot.id)}
                    label="Enable AI"
                />
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Core Personality</CardTitle>
                    <CardDescription>Define the fundamental traits of the bot.</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Select label="Style" value={personality.style} onChange={e => handleSettingChange('style', e.target.value)}>
                        <option value="friendly">Friendly</option>
                        <option value="sarcastic">Sarcastic</option>
                        <option value="professional">Professional</option>
                        <option value="flirty">Flirty</option>
                        <option value="funny">Funny</option>
                    </Select>
                     <Select label="Behavior" value={personality.behavior} onChange={e => handleSettingChange('behavior', e.target.value)}>
                        <option value="dominant">Dominant</option>
                        <option value="submissive">Submissive</option>
                        <option value="neutral">Neutral</option>
                    </Select>
                     <Select label="Mode" value={personality.mode} onChange={e => handleSettingChange('mode', e.target.value)}>
                        <option value="seducer">Seducer</option>
                        <option value="moderator">Moderator</option>
                        <option value="entertainer">Entertainer</option>
                        <option value="helper">Helper</option>
                    </Select>
                    <Select label="AI Provider" value={activeBot.aiProvider} onChange={e => handleProviderChange(e.target.value as AIProvider)}>
                        <option value="gemini">Gemini</option>
                        <option value="gpt">GPT (Mock)</option>
                    </Select>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Behavioral Sliders</CardTitle>
                    <CardDescription>Fine-tune how the bot acts and responds.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <Slider label="Response Speed" min={0} max={100} value={personality.responseSpeed} onChange={e => handleSettingChange('responseSpeed', parseInt(e.target.value))} />
                    <Slider label="Aggressiveness" min={0} max={100} value={personality.aggressiveness} onChange={e => handleSettingChange('aggressiveness', parseInt(e.target.value))} />
                    <Slider label="Humor" min={0} max={100} value={personality.humor} onChange={e => handleSettingChange('humor', parseInt(e.target.value))} />
                    <Slider label="Creativity" min={0} max={100} value={personality.creativity} onChange={e => handleSettingChange('creativity', parseInt(e.target.value))} />
                </CardContent>
            </Card>
        </div>
    );
};
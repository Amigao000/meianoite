================================================================================
GUIA DE MODELOS 3D E TEXTURAS (UNIFORMES ESPORTIVOS)
================================================================================

Para o configurador 3D funcionar no Three.js / React Three Fiber, os arquivos
devem ser salvos na pasta:
👉 c:\projetos\projeto meia noite\public\models\

--------------------------------------------------------------------------------
1. FORMATO DO ARQUIVO 3D RECOMENDADO: .GLB (glTF Binário)
--------------------------------------------------------------------------------
O formato padrão para web 3D é o .GLB (compacto, rápido e com materiais embutidos).

ESTRUTURA DO MODELO 3D:
Para podermos alterar as cores e estampas de forma independente pela interface, 
o modelo 3D (ex: `jersey.glb` ou `uniform.glb`) deve ter as partes separadas 
por malhas (Meshes) nomeadas no Blender/3D Studio:

1. Camisa:
   - `shirt_body` (Corpo principal da camisa - Frente e Costas)
   - `shirt_collar` (Gola - para aplicar a cor secundária)
   - `shirt_sleeves` (Mangas - para detalhes ou cor alternativa)
   - `shirt_cuffs` (Punhos das mangas)

2. Calção:
   - `shorts_body` (Corpo do calção)
   - `shorts_stripes` (Faixas/frisos laterais)

3. Meião:
   - `socks_body` (Corpo do meião)
   - `socks_stripes` (Frisos do meião)

--------------------------------------------------------------------------------
2. MAPAS DE TEXTURA (UV MAP)
--------------------------------------------------------------------------------
Para estampar artes, listras e números com precisão milimétrica:
- O modelo 3D precisa ter UV Unwrapping (mapa UV aberto).
- Textura base recomendada: PNG transparente de 2048x2048 ou 4096x4096.

--------------------------------------------------------------------------------
3. ARQUIVOS PARA ESCUDO E PATROCINADORES
--------------------------------------------------------------------------------
Para aplicação dos logos pelo usuário via Decals:
- Formato: PNG com fundo 100% transparente ou SVG.
- Resolução recomendada: Mínimo 512x512 pixels.

--------------------------------------------------------------------------------
4. ONDE ENCONTRAR MODELOS PRONTOS DE CAMISETA / UNIFORME:
--------------------------------------------------------------------------------
- Sketchfab (buscar por "football shirt", "soccer jersey 3d model gltf")
- CGTrader ("sport jersey gltf free")
- TurboSquid
- BlendSwap

*OBSERVAÇÃO:* Caso você ainda não tenha o arquivo .GLB pronto, nós criamos 
um modelo base paramétrico/procedural temporário diretamente no Three.js 
para você poder testar as cores e rotação imediatamente!
================================================================================

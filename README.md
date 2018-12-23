quickstart:
1) Renseigner le path de chrome "pathChrome" dans config.json

2) Lancer graph-viewer.bat

3) Enjoy!

cmd:
graph-viewer {graph} {sens} {template}

ex:
graph-viewer

graph-viewer tree_1

graph-viewer tree_1 asc

graph-viewer tree_1 asc template

graph-viewer tree_v2_1 desc template_v2

graph-viewer tree_v2_2 desc template_v2

par defaut:
tree = ./trees/tree.json

sens = 'desc'

template = ./templates/template.html

'graph-viewer'

est donc équivalent à:

'graph-viewer tree desc template'

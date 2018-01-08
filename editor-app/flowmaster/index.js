global.fm = global.fm || {}


import branch from './branch'
fm.branch = branch

import  './multi'
import  './parallelGate'

fm.getTitle = shape => shape._stencil._jsonStencil.title

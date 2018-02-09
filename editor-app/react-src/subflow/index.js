import render from './component'
import fetch_leftFields from './fetch_leftFields'
import checkSubform from './checkSubform'
import checkMainform from './checkMainform'

global.fm = global.fm || {}

fm.subflow = fm.subflow || {}

fm.subflow.render = render
fm.subflow.fetch_leftFields = fetch_leftFields
fm.subflow.checkSubform = checkSubform
fm.subflow.checkMainform = checkMainform

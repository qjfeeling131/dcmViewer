import React from "react";
import { DragSource } from "react-dnd"; 
import itemTypes from  '../itemTypes';
import { useDropzone } from "react-dropzone";
import dwv from 'dwv';
const style = {
    position: 'absolute',
    border: '1px dashed gray',
    backgroundColor: 'white',
    padding: '0.5rem 1rem',
    cursor: 'move',
    width: 600,
    height: 600,
  }

  function Plugin(props) {
    const {acceptedFiles, getRootProps, getInputProps} = useDropzone({
      getFilesFromEvent: event => myCustomFileGetter(event)
    });

    const files = acceptedFiles.map(f => {
        console.log(f);
        return(
        <li key={f.name}>
          {f.name} has <strong>myProps</strong>: {f.myProp === true ? 'YES' : ''}
        </li>
      )});

      return (
        <section className="container">
          <div {...getRootProps({className: 'dropzone'})}>
            <input {...getInputProps()} />
            <p>Drag 'n' drop some files here, or click to select files</p>
          </div>
          <aside>
            <h4>Files</h4>
            <ul>{files}</ul>
          </aside>
        </section>
      );
    }

  class DrawBox extends React.Component{
      constructor(props){
          super(props)
          this.state = {
            versions: {
              dwv: dwv.getVersion(),
              react: React.version
            },
            tools: ['Scroll', 'ZoomAndPan', 'WindowLevel', 'Draw'],
            selectedTool: 'Select Tool',
            loadProgress: 0,
            dataLoaded: false,
            dwvApp: null,
            tags: [],
            showDicomTags: false,
            toolMenuAnchorEl: null
          };
      }
      render(){
         const {left,top,connectDragSource}=this.props
          return connectDragSource(
            <div style={Object.assign({}, style, { left, top })}>
            <Plugin/>
            </div>,
          )
      }
      
      componentDidMount() {
        // create app
        var app = new dwv.App();
        // initialise app
        app.init({
          "containerDivId": "dwv",
          "tools": this.state.tools,
          "shapes": ["Ruler"],
          "isMobile": true
        });
        // progress
        var self = this;
        app.addEventListener("load-progress", function (event) {
          self.setState({loadProgress: event.loaded});
        });
        app.addEventListener("load-end", function (event) {
          // set data loaded flag
          self.setState({dataLoaded: true});
          // set dicom tags
          self.setState({tags: app.getTags()});
          // set the selected tool
          if (app.isMonoSliceData() && app.getImage().getNumberOfFrames() === 1) {
            self.setState({selectedTool: 'ZoomAndPan'});
          } else {
            self.setState({selectedTool: 'Scroll'});
          }
        });
        // store
        this.setState({dwvApp: app});
      }
  }

  export default DragSource(
    itemTypes.BOX,
    {
      beginDrag(props) {
        const { id, left, top } = props
        return { id, left, top }
      },
    },
    (connect, monitor) => ({
      connectDragSource: connect.dragSource(),
      isDragging: monitor.isDragging(),
    }),
  )(DrawBox)

  async function myCustomFileGetter(event) {
    const files = [];
    const fileList = event.dataTransfer ? event.dataTransfer.files : event.target.files;
  
    for (var i = 0; i < fileList.length; i++) {
      const file = fileList.item(i);
      
      Object.defineProperty(file, 'myProp', {
        value: true
      });
  
      files.push(file);
    }
  
    return files;
  }
import macro from 'vtk.js/Sources/macro';
import vtkViewNode from 'vtk.js/Sources/Rendering/SceneGraph/ViewNode';

// ----------------------------------------------------------------------------
// vtkWebGPUPixelSpaceCallbackMapper methods
// ----------------------------------------------------------------------------

function vtkWebGPUPixelSpaceCallbackMapper(publicAPI, model) {
  model.classHierarchy.push('vtkWebGPUPixelSpaceCallbackMapper');

  publicAPI.opaquePass = (prepass, renderPass) => {
    model.WebGPURenderer =
      publicAPI.getFirstAncestorOfType('vtkWebGPURenderer');
    model.WebGPURenderWindow = model.WebGPURenderer.getParent();
    const aspectRatio = model.WebGPURenderer.getAspectRatio();
    const camera = model.WebGPURenderer
      ? model.WebGPURenderer.getRenderable().getActiveCamera()
      : null;
    const tsize = model.WebGPURenderer.getTiledSizeAndOrigin();
    const texels = null;

    if (model.renderable.getUseZValues()) {
      // Todo
    }

    model.renderable.invokeCallback(
      model.renderable.getInputData(),
      camera,
      aspectRatio,
      tsize,
      texels
    );
  };
}

// ----------------------------------------------------------------------------
// Object factory
// ----------------------------------------------------------------------------

const DEFAULT_VALUES = {};

// ----------------------------------------------------------------------------

export function extend(publicAPI, model, initialValues = {}) {
  Object.assign(model, DEFAULT_VALUES, initialValues);

  // Inheritance
  vtkViewNode.extend(publicAPI, model, initialValues);

  // Object methods
  vtkWebGPUPixelSpaceCallbackMapper(publicAPI, model);
}

// ----------------------------------------------------------------------------

export const newInstance = macro.newInstance(
  extend,
  'vtkWebGPUPixelSpaceCallbackMapper'
);

// ----------------------------------------------------------------------------

export default { newInstance, extend };

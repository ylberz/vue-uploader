<script setup>
import { ref } from "vue";

const props = defineProps({
  label: { type: String, default: "UPLOAD OR DRAG AND DROP" },
  modelValue: { type: Array, default: [] },
  multiple: { type: Boolean, default: true },
});
const emit = defineEmits(["update:modelValue", "onFileUpload", "onRemoveFile"]);
const files = ref([]);
const dropzone = ref(null);
const fileInp = ref(null);

const onClickHandler = (event) => {
  fileInp.value.click();
};

const updateFiles = (newFiles) => {
  if (props.multiple) {
    files.value = [...files.value, ...newFiles];
  } else {
    files.value = newFiles;
  }
  emit("update:modelValue", files.value);
  emit("onFileUpload", files.value);
};

const onFileUpload = (event) => {
  const newFiles = Array.from(event.target.files);
  updateFiles(newFiles);
};

const onDropHandler = (event) => {
  preventDefault(event);
  if (event.dataTransfer) {
    const newFiles = Array.from(event.dataTransfer.files);
    updateFiles(newFiles);
  }
  dropzone.value.classList.remove("drag-over");
};

const removeFile = (fileName) => {
  files.value = files.value.filter((file) => file.name !== fileName);
  mapCurrentFilesToInput(files.value);
  emit("update:modelValue", files.value);
  emit("onRemoveFile", fileName);
};

const mapCurrentFilesToInput = (files) => {
  const dataTransfer = new DataTransfer();
  for (const file of files) {
    dataTransfer.items.add(file);
  }
  fileInp.value.files = dataTransfer.files;
};

const preventDefault = (event) => {
  event.preventDefault();
  event.stopPropagation();
};
const onDragOverHandler = (event) => {
  preventDefault(event);
  dropzone.value.classList.add("drag-over");
};
const onDragEnterHandler = (event) => {
  preventDefault(event);
  dropzone.value.classList.remove("drag-over");
};
const onDragLeaveHandler = (event) => {
  preventDefault(event);
  dropzone.value.classList.remove("drag-over");
};
const onMouseDownHandler = (event) => {
  preventDefault(event);

  dropzone.value.classList.add("drag-over");
};
const onMouseUpHandler = (event) => {
  preventDefault(event);
  dropzone.value.classList.remove("drag-over");
};
</script>
<template>
  <div>
    <div
      id="drop-zone"
      @drop="onDropHandler"
      @dragover="onDragOverHandler"
      @dragenter="onDragEnterHandler"
      @dragleave="onDragLeaveHandler"
      @change="onDropHandler"
      @click="onClickHandler"
      @mousedown="onMouseDownHandler"
      @mouseup="onMouseUpHandler"
      @mouseleave="onMouseUpHandler"
      ref="dropzone"
    >
      <h3>{{ label }}</h3>

      <input
        type="file"
        @change="onFileUpload"
        id="file-upload"
        :multiple="multiple"
        ref="fileInp"
      />
    </div>

    <div class="file-details" v-if="files.length > 0">
      <div class="file" v-for="item in files" :key="item.name">
        <div class="file-name">
          <i class="fa fa-file" style="font-size: 30px"></i>
          <div class="file-name-content">
            <p>{{ item.name }}</p>
          </div>
        </div>

        <button class="close-button" @click="removeFile(item.name)">X</button>
      </div>
    </div>
  </div>
</template>
<style>
.drag-over {
  background-color: #eee;
}

#file-upload {
  display: none;
}

#drop-zone {
  border: 4px dashed #e5e5e5;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  gap: 20px;
  height: 200px;
  cursor: pointer;
}

.file-details {
  padding: 10px;
  display: flex;
  align-items: center;
  border: 1px solid #e5e5e5;
  justify-content: space-between;
  gap: 5px;
  overflow-x: auto;
}

.file-details::-webkit-scrollbar {
  width: 5px;
  height: 12px;
}

.file-details::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey;
  border-radius: 5px;
}

.file-details::-webkit-scrollbar-thumb {
  background: #3db3d6ff;
  border-radius: 10px;
  cursor: pointer;
  width: 20px;
}

.file-details::-webkit-scrollbar-thumb:hover {
  background: #3298b6;
}

#drop-zone h3 {
  color: #8d8d8d;
}

.file {
  background: #f8f9fa;
  padding: 24px;
  font-size: 12px;
  border-radius: 10px;
  position: relative;
  box-shadow: 0 0 4px 2px #cccccc;
}

.close-button {
  color: red;
  cursor: pointer;
  position: absolute;
  top: 5px;
  right: 5px;
  border: 0;
  background: #e0e0e0;
  border-radius: 5px;
}

.close-button:hover {
  border: 1px solid;
}
</style>

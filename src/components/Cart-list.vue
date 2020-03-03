<template>
  <el-table :data="cartListData" style="width: 1120px">
    <el-table-column prop="name" label="全部商品" width="532"/>
    <el-table-column prop="now_price" label="单价" width="132">
      <template slot-scope="scope"><div class="">{{ scope.row.now_price | NumFormat(2)}} 元</div></template>
    </el-table-column>
    <el-table-column label="数量" width="212">
      <template slot-scope="scope"><el-input-number @change="changeCount(scope.row)" v-model="scope.row.count" :min="1" :max="scope.row.limited_count"/></template>
    </el-table-column>
    <el-table-column label="总价">
      <template slot-scope="scope"><div class="">{{ scope.row.now_price*scope.row.count | NumFormat(2)}} 元</div></template>
    </el-table-column>
    <el-table-column label="操作">
    <template slot-scope="scope">
      <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  props: {
    cartListData: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  watch: {},
  methods: {
    handleDelete(row) {
      this.$emit("select-delete", row)
    },
    changeCount(rowIndex){
      this.$emit("select",rowIndex)
    }
  }
};
</script>

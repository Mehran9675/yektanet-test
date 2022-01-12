import { Entry, Filters, Pagination, SortBy, SortOrder } from "@/common/types";
import getTime from "common/function/get-time";

type Data = string | number;

class BTSNode {
  constructor(data: Data, entry: Entry) {
    this.data = data;
    this.entry = entry;
    this.left = null;
    this.right = null;
  }

  data: string | number;
  left: BTSNode | null;
  right: BTSNode | null;
  entry: Entry;
}

export default class BST {
  constructor() {
    this.root = null;
    this.inOrder = [];
    this.items = {};
    this.currentPageSize = 15;
    this.pageCount = 0;
  }

  private root: BTSNode | null;
  private inOrder: Entry[];
  private items: Record<number, Entry[]>;
  private currentPageSize: number;
  private pageCount: number;

  insert(data: Data, entry: Entry) {
    const newNode = new BTSNode(data, entry);
    if (!this.root) return (this.root = newNode);
    else return this.insertNode(this.root, newNode);
  }

  search(node: BTSNode | null, data: Data): BTSNode | null {
    if (!node) return null;
    if (node.data === data) return node;
    if (data < node.data) return this.search(node.left, data);
    if (data > node.data) return this.search(node.right, data);
    return node;
  }

  searchItems(value: string, sortBy: SortBy) {
    switch (sortBy) {
      case "NAME":
        this.inOrder = this.inOrder.filter((item: Entry) =>
          item.name.toLowerCase().includes(value.toLowerCase())
        );
        return this.paginate(this.inOrder, this.currentPageSize);
      case "FIELD":
        this.inOrder = this.inOrder.filter((item: Entry) =>
          item.field.toLowerCase().includes(value.toLowerCase())
        );
        return this.paginate(this.inOrder, this.currentPageSize);

      case "TITLE":
        this.inOrder = this.inOrder.filter((item: Entry) =>
          item.title.toLowerCase().includes(value.toLowerCase())
        );
        return this.paginate(this.inOrder, this.currentPageSize);
    }
  }

  getFromTo(from: string, to: string) {
    this.inOrder = this.inOrder.filter(
      (item: Entry) =>
        getTime(item.date) >= getTime(from) && getTime(item.date) <= getTime(to)
    );
    return this.paginate(this.inOrder, this.currentPageSize);
  }

  async getOrderedItems({
    pageSize = 15,
    page = 1,
    to,
    from,
    sortBy,
    order,
    search,
    searchBy,
  }: Filters): Promise<Pagination> {
    if (!this.root) return { items: [], total: 0, page: 1, pageSize: 15 };
    await this.reset();
    // if (!this.inOrder.length) this.inorder(this.root);
    if (from && to) this.getFromTo(from, to);
    if (search && searchBy) this.searchItems(search, searchBy);
    if (sortBy && order) this.sort(sortBy, order);
    if (this.currentPageSize !== pageSize)
      this.paginate(this.inOrder, pageSize);
    return {
      items: this.items[page || 1] || [],
      page: page || 1,
      total: this.pageCount,
      pageSize: pageSize,
    };
  }

  async reset() {
    this.inOrder = [];
    this.inorder(this.root);
    this.paginate(this.inOrder, this.currentPageSize);
    return {
      items: this.items[1] || [],
      page: 1,
      total: this.pageCount,
      pageSize: this.currentPageSize,
    };
  }

  private paginate(orderedData: Entry[], pageSize: number) {
    if (!this.inOrder.length) this.items = [];
    this.currentPageSize = pageSize;
    let page = 1;
    let chunk: Entry[] = [];
    orderedData.forEach((entry, index) => {
      if (chunk.length < pageSize) chunk.push(entry);
      else {
        this.items[page] = chunk;
        chunk = [];
        page++;
      }
    });

    this.pageCount = page;
  }

  private insertNode(node: BTSNode, newNode: BTSNode) {
    if (newNode.data < node.data) {
      if (node.left) this.insertNode(node.left, newNode);
      else node.left = newNode;
    } else {
      if (node.right) this.insertNode(node.right, newNode);
      else node.right = newNode;
    }
  }

  private inorder(node: BTSNode | null) {
    if (node !== null) {
      this.inorder(node.left);
      this.inOrder.push(node.entry);
      this.inorder(node.right);
    }
  }

  private sort(
    sortBy: "DATE" | "TITLE" | "NAME" | "OLD_VALUE" | "NEW_VALUE",
    order: SortOrder
  ) {
    const sortAcending = (a: string | number, b: string | number) => {
      return a < b ? 1 : -1;
    };
    const sortDescending = (a: string | number, b: string | number) => {
      return a > b ? 1 : -1;
    };
    switch (sortBy) {
      case "DATE":
        this.inOrder = this.inOrder.sort((a: Entry, b: Entry) => {
          return order === "ASCENDING"
            ? sortAcending(a.date, b.date)
            : sortDescending(a.date, b.date);
        });
        break;
      case "TITLE":
        this.inOrder = this.inOrder.sort((a: Entry, b: Entry) => {
          return order === "ASCENDING"
            ? sortAcending(a.title, b.title)
            : sortDescending(a.title, b.title);
        });
        break;
      case "NAME":
        this.inOrder = this.inOrder.sort((a: Entry, b: Entry) => {
          return order === "ASCENDING"
            ? sortAcending(a.name, b.name)
            : sortDescending(a.name, b.name);
        });
        break;
      case "OLD_VALUE":
        this.inOrder = this.inOrder.sort((a: Entry, b: Entry) => {
          return order === "ASCENDING"
            ? sortAcending(a.old_value, b.old_value)
            : sortDescending(a.old_value, b.old_value);
        });
        break;
      case "NEW_VALUE":
        this.inOrder = this.inOrder.sort((a: Entry, b: Entry) => {
          return order === "ASCENDING"
            ? sortAcending(a.new_value, b.new_value)
            : sortDescending(a.new_value, b.new_value);
        });
        break;
    }
  }
}

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import ArticleForm from "../components/ArticleForm";
import { type Article } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function AdminPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [deleteArticleId, setDeleteArticleId] = useState<string | null>(null);
  const { toast } = useToast();

  const { data: articles, isLoading } = useQuery<Article[]>({
    queryKey: ["/api/articles"],
  });

  const handleEdit = (article: Article) => {
    setEditingArticle(article);
    setIsFormOpen(true);
  };

  const handleCreate = () => {
    setEditingArticle(null);
    setIsFormOpen(true);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setEditingArticle(null);
  };

  const handleDelete = async () => {
    if (!deleteArticleId) return;

    try {
      await apiRequest("DELETE", `/api/articles/${deleteArticleId}`);

      await queryClient.invalidateQueries({ queryKey: ["/api/articles"] });

      toast({
        title: "Success",
        description: "Article deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete article",
        variant: "destructive",
      });
    } finally {
      setDeleteArticleId(null);
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      politics: "bg-blue-500/10 text-blue-700 dark:text-blue-400",
      technology: "bg-purple-500/10 text-purple-700 dark:text-purple-400",
      sports: "bg-green-500/10 text-green-700 dark:text-green-400",
      business: "bg-orange-500/10 text-orange-700 dark:text-orange-400",
      world: "bg-red-500/10 text-red-700 dark:text-red-400",
    };
    return colors[category] || "bg-gray-500/10 text-gray-700 dark:text-gray-400";
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground" data-testid="text-admin-title">
              Content Management System
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage your news articles and content
            </p>
          </div>
          <Button
            onClick={handleCreate}
            size="default"
            data-testid="button-create-article"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Article
          </Button>
        </div>

        {isFormOpen && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>
                {editingArticle ? "Edit Article" : "Create New Article"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ArticleForm
                article={editingArticle}
                onSuccess={handleFormClose}
                onCancel={handleFormClose}
              />
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Articles</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-24 w-full" />
                ))}
              </div>
            ) : !articles || articles.length === 0 ? (
              <div className="text-center py-12" data-testid="text-no-articles">
                <p className="text-muted-foreground">
                  No articles yet. Create your first article to get started!
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {articles.map((article) => (
                  <Card
                    key={article.id}
                    className="hover-elevate"
                    data-testid={`card-article-${article.id}`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge
                              className={getCategoryColor(article.category)}
                              data-testid={`badge-category-${article.id}`}
                            >
                              {article.category}
                            </Badge>
                            <Badge
                              variant="outline"
                              data-testid={`badge-language-${article.id}`}
                            >
                              {article.language === "ar" ? "Arabic" : "English"}
                            </Badge>
                            {article.isBreaking && (
                              <Badge
                                variant="destructive"
                                data-testid={`badge-breaking-${article.id}`}
                              >
                                Breaking
                              </Badge>
                            )}
                          </div>
                          <h3
                            className="text-lg font-semibold mb-1"
                            data-testid={`text-title-${article.id}`}
                          >
                            {article.title}
                          </h3>
                          <p
                            className="text-sm text-muted-foreground line-clamp-2 mb-2"
                            data-testid={`text-summary-${article.id}`}
                          >
                            {article.summary}
                          </p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span>By {article.author}</span>
                            <span className="flex items-center gap-1">
                              <Eye className="w-3 h-3" />
                              {article.views || 0} views
                            </span>
                            <span>
                              {article.publishedAt 
                                ? new Date(article.publishedAt).toLocaleDateString()
                                : "—"}
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleEdit(article)}
                            data-testid={`button-edit-${article.id}`}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => setDeleteArticleId(article.id)}
                            data-testid={`button-delete-${article.id}`}
                          >
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <AlertDialog
          open={!!deleteArticleId}
          onOpenChange={(open) => !open && setDeleteArticleId(null)}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Article</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete this article? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel data-testid="button-cancel-delete">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                data-testid="button-confirm-delete"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}